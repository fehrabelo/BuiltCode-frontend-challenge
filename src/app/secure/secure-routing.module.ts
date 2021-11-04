import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudDoctorComponent } from './pages/doctors/crud/crud-doctor.component';
import { DoctorsComponent } from './pages/doctors/list-doctors/doctors.component';
import { CrudPatientComponent } from './pages/patients/crud/crud-patient.component';
import { PatientsComponent } from './pages/patients/list-patients/patients.component';

const routes: Routes = [
  { path: 'doutores', component: DoctorsComponent },
  { path: 'pacientes', component: PatientsComponent },
  { path: 'adicionar-doutor', component: CrudDoctorComponent },
  { path: 'editar-doutor', component: CrudDoctorComponent },
  { path: 'adicionar-paciente', component: CrudPatientComponent },
  { path: 'editar-paciente', component: CrudPatientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
