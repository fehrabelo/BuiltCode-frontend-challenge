import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatientsService } from '../service/patients.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit, OnDestroy {

  //icons
  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  patientsData: any;
  subs: Subscription[] = [];
  docFilter: any;

  //pagination
  pageIndex: number = 1;
  pageSize: number = 10;

  constructor(
    private patService: PatientsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.subs.push(
      this.patService.getPatients(this.pageIndex, this.pageSize)
        .subscribe(response => {
          this.patientsData = response.data.itens
          this.docFilter = localStorage.getItem('docData')
          console.log(JSON.parse(this.docFilter)
          );
        })
    )
  }

  editPatient(patInfo: any) {
    this.router.navigate([`/editar-paciente`]);
    localStorage.setItem('patientInfo', JSON.stringify(patInfo))
  }

  deletePatient(patInfo: any) {
    this.subs.push(
      this.patService.deletePatient(patInfo.id)
        .subscribe(response => {
          if (response.success == true) {
            this.toastr.error('excluido com sucesso!', patInfo.name);
          }
        })
    )
  }

  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())
  }
}
