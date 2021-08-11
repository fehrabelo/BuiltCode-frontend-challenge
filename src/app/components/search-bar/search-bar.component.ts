import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DoctorsService } from '../doctors/service/doctors.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allPosts: any;
  autoCompleteList: any[]

  //pagination
  pageIndex: number;
  pageSize: number;

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(public docService: DoctorsService) { }

  ngOnInit(): void {

    this.docService.getDoctors(this.pageIndex, this.pageSize).subscribe(posts => {
      this.allPosts = posts
      console.log(this.allPosts);
    });

    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })
  }

  private autoCompleteExpenseList(input: any) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }


  // this is where filtering the data happens according to you typed value
  filterCategoryList(val: any) {
    var categoryList = []
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allPosts.data.itens.filter((s: any) => s.name.toLowerCase().indexOf(val.toLowerCase()) != -1) : this.allPosts;
  }

  // after you clicked an autosuggest option, this function will show the field you want to show in input
  displayFn(post: any) {
    console.log(post);

    let k = post ? post.name : post;
    return k;
  }



  filterPostList(event: any) {
    var posts = event.source.value;
    if (!posts) {
      this.docService.searchOption = []
    }
    else {

      this.docService.searchOption.push(posts);
      this.onSelectedOption.emit(this.docService.searchOption)
    }
    this.focusOnPlaceInput();
  }

  removeOption(option: any) {

    let index = this.docService.searchOption.indexOf(option);
    if (index >= 0)
      this.docService.searchOption.splice(index, 1);
    this.focusOnPlaceInput();

    this.onSelectedOption.emit(this.docService.searchOption)
  }

  // focus the input field and remove any unwanted text.
  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }

}
