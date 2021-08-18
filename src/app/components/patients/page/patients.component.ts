import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientsService } from '../service/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit, OnDestroy {
  patientsData: any;
  @Input() doctorsFilter: any;
  subs: Subscription[] = [];
  docFilter: any;
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

          this.docFilter = localStorage.getItem('docData')
          console.log(JSON.parse(this.docFilter)
          );
        })
    )
  }

  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())

  }
}
