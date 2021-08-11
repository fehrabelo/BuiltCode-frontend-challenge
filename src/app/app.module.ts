import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';

//components
import { DoctorsComponent } from './components/doctors/page/doctors.component';
import { DoctorsService } from './components/doctors/service/doctors.service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

// angular material 
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientsComponent } from './components/patients/page/patients.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    DoctorsComponent,
    PatientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule, MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule

  ],
  providers: [DoctorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
