import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';


//components
import { DoctorsService } from './components/doctors/service/doctors.service';
import { DoctorsComponent } from './components/doctors/pages/list-doctors/doctors.component';
import { PatientsComponent } from './components/patients/pages/list-patients/patients.component';
import { CrudDoctorComponent } from './components/doctors/pages/crud/crud-doctor.component';
import { CrudPatientComponent } from './components/patients/pages/crud/crud-patient.component';

//libs
import { NgxMaskModule, IConfig } from 'ngx-mask'

// const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    PatientsComponent,
    CrudDoctorComponent,
    CrudPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),

  ],
  providers: [DoctorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
