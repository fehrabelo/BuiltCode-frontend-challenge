import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatientsService } from '../../service/patients.service';

@Component({
  selector: 'app-crud-patient',
  templateUrl: './crud-patient.component.html',
  styleUrls: ['./crud-patient.component.scss']
})
export class CrudPatientComponent implements OnInit, OnDestroy {
  formExihibit: boolean;
  subs: Subscription[] = [];
  patientForm: FormGroup;
  patientData: any;

  constructor(private patstService: PatientsService,
    private FormBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    if (localStorage.getItem('patientInfo') != null) {
      this.formExihibit = true;
      this.patientData = localStorage.getItem('patientInfo');
      this.patientData = JSON.parse(this.patientData);
      this.patientForm = this.FormBuilder.group({
        name: [this.patientData.name, Validators.required],
        birthDate: [this.patientData.birthDate, Validators.required],
        cpf: [this.patientData.cpf, Validators.required],
        doctorId: [this.patientData.doctor.id, Validators.required]
      })
      localStorage.removeItem('patientInfo');
    } else {
      this.formExihibit = false;
      this.patientForm = this.FormBuilder.group({
        name: ['', Validators.required],
        birthDate: ['', Validators.required],
        cpf: ['', Validators.required],
      })
    }
  }

  createPatient(patientData: any) {
    this.subs.push(
      this.patstService.createPatient(JSON.stringify(patientData.value))
        .subscribe(response => {
          console.log(response);
          if (response.success == true) {
            this.router.navigate([`/doutores`]);
          }
        })
    )

  }

  updatePatient(patientData: any) {
    this.subs.push(
      this.patstService.updatePatientInfo(this.patientData.id, JSON.stringify(patientData.value))
        .subscribe(response => {
          console.log(response);
        })
    )

  }

  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())
  }

}
