import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';

//components
import { DoctorsService } from './components/doctors/service/doctors.service';
import { DoctorsComponent } from './components/doctors/pages/list/doctors.component';
import { PatientsComponent } from './components/patients/page/patients.component';
import { CrudComponent } from './components/doctors/pages/crud/crud.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    PatientsComponent,
    CrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DoctorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
