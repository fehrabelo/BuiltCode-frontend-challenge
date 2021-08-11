import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './components/doctors/page/doctors.component';
import { LoginComponent } from './components/login/page/login.component';
import { PatientsComponent } from './components/patients/page/patients.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'doutores', component: DoctorsComponent },
  { path: 'pacientes', component: PatientsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
