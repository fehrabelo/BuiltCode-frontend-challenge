import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoctorsService } from '../../service/doctors.service';

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
  docData: any;
  subs: Subscription[] = [];
  docInfos: any;
  constructor(private docService: DoctorsService,
    private router: Router) { }

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

          // this.docData = response.data
          // localStorage.setItem('docData', JSON.stringify(this.docInfos))
        })
    )
  }

  editDoc(docInfo: any) {
    this.router.navigate([`/editar-doutor/${docInfo.id}`])
    let data = docInfo;
    localStorage.setItem('docInfo', JSON.stringify(data))
  }

  getDoctorsHandler(data: any) {
    console.log(data);
  }

  // getDoctors() {
  //   const response = this.service.getDoctors(this.doctorName, this.pageIndex, this.pageSize, this.sortField, this.sortType)
  //   console.log(response)
  //   if (response.success) {
  //     // this.productsList = response.data
  //     // this.showcaseMax = response.total
  //   }
  // }

  // setVisibilityFilter(op: number, e: any) {
  //   console.log(op);

  //   console.log(e);
  //   //$('.status-filter-li').removeClass('active')

  //   console.log('#statusFilter' + e);

  //   if (e != 0) {
  //     $('#statusFilter0').removeClass('active')
  //     const filters = this.selectedVisibilityFilter

  //     const found = filters.find(i => i == op);
  //     console.log(found);

  //     if (found != undefined) {
  //       console.log(filters.indexOf(found));
  //       filters.splice(filters.indexOf(found), 1)
  //     } else {
  //       this.selectedVisibilityFilter.push(op)
  //     }

  //     console.log(this.selectedVisibilityFilter);

  //     if (this.selectedVisibilityFilter.length == 0) {
  //       $('#statusFilter0').addClass('active')
  //     }

  //   } else {
  //     $('.status-filter-li').removeClass('active')
  //     this.selectedVisibilityFilter = []
  //   }

  //   $('#statusFilter' + e).toggleClass('active')

  //   this.setFilters(null)


  //   console.log(this.selectedVisibilityFilter);

  // }


  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())

  }

}
