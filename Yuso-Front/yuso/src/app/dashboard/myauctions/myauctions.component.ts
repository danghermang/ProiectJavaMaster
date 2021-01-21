import { Component} from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BackendApiService } from '../../services/backend-api.service';

@Component({
  selector: 'yuso-myauctions',
  templateUrl: './myauctions.component.html',
  styleUrls: ['./myauctions.component.css']
})
export class MyauctionsComponent {
  jobList: any = [];

  constructor(private backendService: BackendApiService) {
    let sessionId = Cookie.get('sessionId');
    this.backendService.getMyAuction(sessionId).subscribe(
      data => {
          this.jobList = data.auctions;
          if(this.jobList != null) {
              for (let i = 0; i < this.jobList.length; i++) {
                  let date = new Date(this.jobList[i].endDate);
                  this.jobList[i].endDate = date.toISOString().substr(0, 11).replace('T', ' ');
                  if (this.jobList[i].aditionalDetails.length > 64) {
                      this.jobList[i].aditionalDetails = this.jobList[i].aditionalDetails.substr(0, 64) + ' (...)';
                  }
              }
          }
      },
      error => console.error('ERROR: BackendService - getJobList()')
  );
  }
}
