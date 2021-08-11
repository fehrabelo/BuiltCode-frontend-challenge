import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  // login(data: any) {
  //   console.log(data);
  //   const headers = {
  //     'accept': 'application/json',
  //     'Content-Type': 'application/json-patch+json'
  //   }
  //   return this.http.post<any>(`${dataApi.siteUrl}/v1/mobile/auth`, data, { headers: headers })
  //     .toPromise()
  //     .then(response => {
  //       localStorage.setItem('token', response.data.accessToken)
  //       return response
  //     })
  // }

  login(data: any): Observable<any> {
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json-patch+json'
    }
    return this.http.post<any>(`${dataApi.siteUrl}/v1/mobile/auth`, data, { headers: headers })

  }


}

















  // login(auth: {}): Observable<any> {
  //   return this.http.get<any>(dataApi.siteUrl + '/v1/mobile/' + auth)
  //   // https://dev-exam-api.btcd.com.br/v1/mobile/auth
  //   // return this.http.get<any>('https://dev-exam-api.btcd.com.br/v1/mobile/auth',  {
  //   //   email: string;
  //   // password: string 
  //   // })
  // }




//  if (response.token) {
//           this.storageService.add('auth', response.token)
//           this.storageService.add('email', response.name)
//           this.id = response.idUser
//           localStorage.setItem("id", this.id)
//           this.getUserName(this.id)
//           this.getUserData(this.id)
//           console.log(response)
//           return { success: true }
//         } else {
//           this.storageService.remove('auth')
//           return { success: false, message: 'Erro ao entrar, confira os dados e tente novamente.' }
//         }