import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  searchOption: any = []
  public patientsInfo: [];

  constructor(private http: HttpClient) { }

  getPatients(pageIndex: number, pageSize: number): Observable<any> {
    const data = localStorage.getItem('token');
    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + data
    }
    return this.http.get<any>(`${dataApi.siteUrl}/v1/mobile/patients?PageIndex=${pageIndex}&PageSize=${pageSize}`, { headers: headers })
  }


  // method to filter logic in the Input
  filteredListOptions() {
    let posts: any = this.patientsInfo;
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
