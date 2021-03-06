import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private login: LoginService,
    private FormBuilder: FormBuilder,
    private router: Router) { }

  subs: Subscription[] = [];
  loginForm: FormGroup;
  userData: any;

  ngOnInit(): void {
    this.createLoginForm();

  }

  createLoginForm() {
    this.loginForm = this.FormBuilder.group({
      email: ['ferabeloleite@hotmail.com', Validators.required],
      password: ['uN3Hc1Le.wmg', Validators.required],
    })
  }

  userLogin(loginForm: any) {
    this.subs.push(
      this.login.login(JSON.stringify(loginForm.value))
        .subscribe(response => {
          console.log(response);
          this.loginDataHandler(response)
          localStorage.setItem('token', response.data.accessToken)
        }))
  }

  loginDataHandler(data: any) {
    if (data.success == true) {
      this.router.navigate(['doutores'])
    }
  }

  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())
  }
}
