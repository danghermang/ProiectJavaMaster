import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from "@angular/router";
import { BackendApiService } from '../../services/backend-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'yuso-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  auctionList = [];
  searchFilter: string = '';
  fromCityFilter: string = '';
  toCityFilter: string = '';
  thirdFormGroup: FormGroup;

  constructor(private router: Router, private backendService: BackendApiService ,private _formBuilder: FormBuilder) {
    this.getPromotedList();

    this.thirdFormGroup = this._formBuilder.group({
        thirdCtrl: ['',]
      });
   }

   getPromotedList(){
    this.backendService.getPromotedList(Cookie.get('sessionId')).subscribe(
        data => {
            this.auctionList = data;
            for(let i = 0; i < this.auctionList.length; i++){
                let date = new Date(this.auctionList[i].endDate);
                this.auctionList[i].endDate = date.toISOString().substr(0, 11).replace('T', ' ');
                if(this.auctionList[i].entries == -1 ){
                    this.auctionList[i].entries = '-';
                    this.auctionList[i].lowestBid = '-';
                }
            }
        },
        error => console.error('ERROR: BackendService - getJobList()' + error)
    );
  }
  onEnterAuctionClick(jobId: string){
		this.router.navigateByUrl('/auction?aid=' + jobId);
  }
  onSearchBtnClick() {
    if(this.searchFilter == '' && this.fromCityFilter == '' && this.toCityFilter == ''){
        this.getPromotedList();
        return;
    }

    this.backendService.getJobList(Cookie.get('sessionId'), this.searchFilter, this.fromCityFilter, this.toCityFilter).subscribe(
        data => {
            this.auctionList = data;
            for(let i = 0; i < this.auctionList.length; i++){
                let date = new Date(this.auctionList[i].auctionDate.endDate);
                this.auctionList[i].auctionDate.endDate = date.toISOString().substr(0, 11).replace('T', ' ');
            }
        },
        error => console.error('ERROR: BackendService - getJobList()')
    );
}

}
