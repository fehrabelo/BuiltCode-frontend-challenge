import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorsService } from '../service/doctors.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  doctorName?: string = "Andre";
  pageIndex: number = 1;
  pageSize: number = 10;
  sortField?: string;
  sortType?: string;

  subs: Subscription[] = [];
  docInfos: any;
  constructor(private docService: DoctorsService) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {

    this.subs.push(
      this.docService.getDoctors(this.pageIndex, this.pageSize)
        .subscribe(response => {
          console.log(response);
          // this.getDoctorsHandler(response.data.itens)
          this.docInfos = response.data.itens
          console.log(this.docInfos);

          this.docService.doctorsData = this.docInfos
        })
    )
  }
  getDoctorsHandler(data: any) {
    console.log(data);
  }

  onSelectedOption(e: any) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.docService.searchOption.length > 0)
      this.docInfos = this.docService.filteredListOptions();
    else {
      this.docInfos = this.docService.doctorsData;
    }
    console.log(this.docInfos)
  }

  // getDoctors() {
  //   const response = this.service.getDoctors(this.doctorName, this.pageIndex, this.pageSize, this.sortField, this.sortType)
  //   console.log(response)
  //   if (response.success) {
  //     // this.productsList = response.data
  //     // this.showcaseMax = response.total
  //   }
  // }


  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())

  }

}
