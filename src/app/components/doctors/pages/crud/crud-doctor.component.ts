import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoctorsService } from '../../service/doctors.service';

@Component({
  selector: 'app-crud-doctor',
  templateUrl: './crud-doctor.component.html',
  styleUrls: ['./crud-doctor.component.scss']
})
export class CrudDoctorComponent implements OnInit {

  subs: Subscription[] = [];
  docForm: FormGroup;
  docData: any;
  formExihibit: boolean;
  constructor(private docService: DoctorsService,
    private FormBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    if (localStorage.getItem('docInfo') != null) {
      this.formExihibit = true;
      this.docData = localStorage.getItem('docInfo');
      this.docData = JSON.parse(this.docData);
      this.docForm = this.FormBuilder.group({
        name: [this.docData.name, Validators.required],
        crm: [this.docData.crm, Validators.required],
        crmUf: [this.docData.crmUf, Validators.required],
      })
      localStorage.removeItem('docInfo');
    } else {
      this.formExihibit = false;
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
          if (response.success == true) {
            this.router.navigate([`/doutores`]);
          }
        })
    )
  }

  updateDoctor(updateDocForm: any) {
    this.subs.push(
      this.docService.updateDoctorInfo(this.docData.id, JSON.stringify(updateDocForm.value))
        .subscribe(response => {
          console.log(response);
          if (response.success == true) {
            this.router.navigate([`/doutores`]);
          }
        })
    )

  }

  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())
  }
}
