import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BackendApiService } from '../../services/backend-api.service';

@Component({
  selector: 'yuso-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  headingItems = [
		{ name: 'Uncompleted', selected: true },
		{ name: 'Completed', selected: false },
		{ name: 'All', selected: false }
  ];
  selectedItem = 0;
    bookingsList = [];
    dutyStatus: boolean = false;

  constructor(private backendService: BackendApiService) {
    let sessionId = Cookie.get('sessionId');

    this.backendService.getJobsWon(Cookie.get('sessionId'), 'uncompleted').subscribe(
        data => {
          this.bookingsList = data;
          if(this.bookingsList != null){
              for(let i = 0; i < this.bookingsList.length; i++){
                  if(this.bookingsList[i].aditionalDetails.length > 64) {
                      this.bookingsList[i].aditionalDetails = this.bookingsList[i].aditionalDetails.substr(0, 64) + ' (...)';
                  }
              }
          }
      },
      error => console.error('ERROR: BackendService - getJobsWon()')
    );
   }

  ngOnInit() {
  }
  onHeadingClick(index: any){
		this.headingItems[this.selectedItem].selected = false;
		this.selectedItem = index;
		this.headingItems[this.selectedItem].selected = true;

		let filter;
		if(index == 0){
		    filter = 'uncompleted';
        }
        else if(index == 1){
		    filter = 'completed';
        }
        else{
            filter = 'all';
        }

        this.backendService.getJobsWon(Cookie.get('sessionId'), filter).subscribe(
            data => { this.bookingsList = data;
                if(this.bookingsList != null){
                    for(let i = 0; i < this.bookingsList.length; i++){
                        if(this.bookingsList[i].aditionalDetails.length > 64) {
                            this.bookingsList[i].aditionalDetails = this.bookingsList[i].aditionalDetails.substr(0, 64) + ' (...)';
                        }
                    }
                }},
            error => console.error('ERROR: BackendService - getJobsWon()')
        );
	  }
}
