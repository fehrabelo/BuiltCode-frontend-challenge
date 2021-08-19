import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/page/login.component';
import { DoctorsComponent } from './components/doctors/pages/list-doctors/doctors.component';
import { PatientsComponent } from './components/patients/pages/list-patients/patients.component';
import { CrudPatientComponent } from './components/patients/pages/crud/crud-patient.component';
import { CrudDoctorComponent } from './components/doctors/pages/crud/crud-doctor.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'doutores', component: DoctorsComponent },
  { path: 'pacientes', component: PatientsComponent },
  { path: 'adicionar-doutor', component: CrudDoctorComponent },
  { path: 'editar-doutor', component: CrudDoctorComponent },
  { path: 'adicionar-paciente', component: CrudPatientComponent },
  { path: 'editar-pacient', component: CrudPatientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
