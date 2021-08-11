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
    const data = localStorage.getItem('token');
    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + data
    }
    // return this.http.get<any>(dataApi.siteUrl + "/v1/mobile/doctors?Name=Felipe%20&PageIndex=1&PageSize=10&SortField=a&SortType=a")
    // return this.http.get<any>(`${dataApi.siteUrl}/v1/mobile/doctors?Name=${name} &PageIndex=${pageIndex}&PageSize=${pageSize}&SortField=${sortField}&SortType=${sortType}`
    return this.http.get<any>(`${dataApi.siteUrl}/v1/mobile/doctors?PageIndex=${pageIndex}&PageSize=${pageSize}`, { headers: headers })
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

