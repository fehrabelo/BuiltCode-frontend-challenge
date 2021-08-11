import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  searchOption: any = []

  constructor(private http: HttpClient) { }

  getPatients(pageIndex: number, pageSize: number): Observable<any> {
    const data = localStorage.getItem('token');
    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + data
    }
    return this.http.get<any>(`${dataApi.siteUrl}/v1/mobile/patients?PageIndex=${pageIndex}&PageSize=${pageSize}`, { headers: headers })
  }

}
