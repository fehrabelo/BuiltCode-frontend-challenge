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

  pageIndex: number = 1;
  pageSize: number = 15;
  showcaseMax: number;
  docData: any;
  subs: Subscription[] = [];
  docInfos: any;

  constructor(
    private docService: DoctorsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.subs.push(
      this.docService.getDoctors(this.pageIndex, this.pageSize)
        .subscribe(response => {
          this.docInfos = response.data.itens
          console.log(this.docInfos);
          this.showcaseMax = response.data.totalRecords

          this.docData = response.data
          console.log(this.docData);

          localStorage.setItem('docData', JSON.stringify(this.docInfos))
        })
    )
  }

  editDoc(docInfo: any) {
    this.router.navigate([`/editar-doutor`]);
    // this.router.navigate([`/editar-doutor/${docInfo.id}`]);
    localStorage.setItem('docInfo', JSON.stringify(docInfo))
  }

  pageChange(event: any) {
    this.pageIndex = event
    this.getDoctors();
  }

  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())

  }

}
