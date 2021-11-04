import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { dataApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  searchOption: any = []
  public doctorsData: [];

  constructor(private http: HttpClient) { }

  getDoctors(pageIndex: number, pageSize: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    return this.http.get<any>(`${dataApi.siteUrl}/v1/mobile/doctors?PageIndex=${pageIndex}&PageSize=${pageSize}`, { headers: headers })
  }


  createDoctor(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json-patch+json'
    }
    return this.http.post<any>(`${dataApi.siteUrl}/v1/mobile/doctors/create`, data, { headers: headers })
  }

  updateDoctorInfo(doctorId: any, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json-patch+json'
    }
    return this.http.put<any>(`${dataApi.siteUrl}/v1/mobile/doctors/update/` + doctorId, data, { headers: headers })
  }

  deleteDoctor(doctorId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json-patch+json'
    }
    return this.http.delete<any>(`${dataApi.siteUrl}/v1/mobile/doctors/delete/` + doctorId, { headers: headers })
  }

  // method to filter logic in the Input
  filteredListOptions() {
    let posts: any = this.doctorsData;
    console.log(posts);

    let filteredPostsList: any = [];
    console.log(filteredPostsList);

    for (let post of posts) {
      for (let options of this.searchOption) {
        if (options.name === post.name) {
          filteredPostsList.push(post);
        }
      }
    }
    console.log(filteredPostsList);
    return filteredPostsList;
  }

}

