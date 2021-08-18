import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoctorsService } from '../../service/doctors.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  subs: Subscription[] = [];
  docForm: FormGroup;
  data: any;

  constructor(private docService: DoctorsService,
    private FormBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    if (localStorage.getItem('docInfo') != null) {
      this.data = localStorage.getItem('docInfo')
      this.data = JSON.parse(this.data);
      this.docForm = this.FormBuilder.group({
        name: [this.data.name, Validators.required],
        crm: [this.data.crm, Validators.required],
        crmUf: [this.data.crmUf, Validators.required],
      })
    } else {
      this.docForm = this.FormBuilder.group({
        name: ['', Validators.required],
        crm: ['', Validators.required],
        crmUf: ['', Validators.required],
      })
    }
  }

  createDoctor(createDocForm: any) {
    this.subs.push(
      this.docService.createDoctor(JSON.stringify(createDocForm.value))
        .subscribe(response => {
          console.log(response);
        })
    )
  }

  updateDoctor(updateDocForm: any) {
    this.subs.push(
      this.docService.updateDoctorInfo(JSON.stringify(updateDocForm.value))
        .subscribe(response => {
          console.log(response);
        })
    )
  }

  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())
  }
}
