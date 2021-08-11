import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientsService } from '../service/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit, OnDestroy {
  patientsData: any;

  subs: Subscription[] = [];

  //pagination
  pageIndex: number = 1;
  pageSize: number = 10;
  constructor(private patSevice: PatientsService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.subs.push(
      this.patSevice.getPatients(this.pageIndex, this.pageSize)
        .subscribe(response => {
          console.log(response);
          // this.getDoctorsHandler(response.data.itens)
          this.patientsData = response.data.itens
          console.log(this.patientsData);

          // used to pass data to service
          // this.docService.doctorsData = this.docInfos
        })
    )
  }

  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())

  }
}
