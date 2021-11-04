import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DoctorsService } from '../service/doctors.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  // icon
  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  pageIndex: number = 1;
  pageSize: number = 15;
  showcaseMax: number;
  docData: any;
  subs: Subscription[] = [];
  docInfos: any;

  constructor(
    private docService: DoctorsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.subs.push(
      this.docService.getDoctors(this.pageIndex, this.pageSize)
        .subscribe(response => {
          this.docInfos = response.data.itens
          console.log(this.docInfos);
          this.docData = response.data
          localStorage.setItem('docData', JSON.stringify(this.docInfos))
        })
    )
  }

  editDoc(docInfo: any) {
    this.router.navigate([`/editar-doutor`]);
    localStorage.setItem('docInfo', JSON.stringify(docInfo))
  }

  deleteDoctor(docInfo: any) {
    this.subs.push(
      this.docService.deleteDoctor(docInfo.id)
        .subscribe(response => {
          if (response.success == true) {
            this.toastr.error('excluido com sucesso!', docInfo.name);
          }
        })
    )
  }

  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe())

  }

}
