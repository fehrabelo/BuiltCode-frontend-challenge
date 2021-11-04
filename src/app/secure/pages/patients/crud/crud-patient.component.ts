import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DoctorsService } from '../../doctors/service/doctors.service';
import { PatientsService } from '../service/patients.service';

@Component({
  selector: 'app-crud-patient',
  templateUrl: './crud-patient.component.html',
  styleUrls: ['./crud-patient.component.scss']
})
export class CrudPatientComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  // data manipulation
  patientForm: FormGroup;
  patientData: any;
  formExihibit: boolean;
  doctorsList: any;

  //pagination
  pageIndex: number = 1;
  pageSize: number = 15;

  constructor(
    private patstService: PatientsService,
    private docService: DoctorsService,
    private FormBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDoctor();

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
        doctorId: ['', Validators.required],
      })
    }
  }

  getDoctor() {
    this.subs.push(
      this.docService.getDoctors(this.pageIndex, this.pageSize)
        .subscribe(response => {
          this.doctorsList = response.data.itens
          console.log(response);
        }))
  }

  createPatient(patientData: any) {
    this.subs.push(
      this.patstService.createPatient(JSON.stringify(patientData.value))
        .subscribe(response => {
          console.log(response);
          if (response.success == true) {
            this.toastr.success('adicionado com sucesso!', patientData.value.name);
            this.router.navigate([`/doutores`]);
          } else {
            this.toastr.error('Dados inconsistentes');
          }
        })
    )

  }

  updatePatient(patientData: any) {
    this.subs.push(
      this.patstService.updatePatientInfo(this.patientData.id, JSON.stringify(patientData.value))
        .subscribe(response => {
          if (response.success == true) {
            this.toastr.warning('atualizado com sucesso!', patientData.value.name);
            this.router.navigate([`/pacientes`]);
          } else {
            this.toastr.error('Dados inconsistentes');
          }
          console.log(response);
        })
    )

  }

  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())
  }

}
