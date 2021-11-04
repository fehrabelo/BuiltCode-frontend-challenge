import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secure-routing.module';
import { CrudPatientComponent } from './pages/patients/crud/crud-patient.component';
import { CrudDoctorComponent } from './pages/doctors/crud/crud-doctor.component';
import { PatientsComponent } from './pages/patients/list-patients/patients.component';
import { DoctorsComponent } from './pages/doctors/list-doctors/doctors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    DoctorsComponent,
    PatientsComponent,
    CrudDoctorComponent,
    CrudPatientComponent
  ],
  imports: [
    CommonModule,
    SecureRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FontAwesomeModule
  ]
})
export class SecureModule { }
