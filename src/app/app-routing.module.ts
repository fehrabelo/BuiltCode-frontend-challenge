import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './components/doctors/pages/crud/crud.component';
import { DoctorsComponent } from './components/doctors/pages/list/doctors.component';
import { LoginComponent } from './components/login/page/login.component';
import { PatientsComponent } from './components/patients/page/patients.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'doutores', component: DoctorsComponent },
  { path: 'pacientes', component: PatientsComponent },
  { path: 'adicionar-doutor', component: CrudComponent },
  { path: 'editar-doutor/:id', component: CrudComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
