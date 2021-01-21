import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BackendApiService } from '../../services/backend-api.service';

@Component({
  selector: 'yuso-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  userRating: number = 0;
  county: string = '';
  city: string = '';
  dateJoined: any;
  transporterRating: number = 0;
  filledUserRatingStars = [];
  emptyUserRatingStars = [];
  filledTransRatingStars = [];
  emptyTransRatingStars = [];

  imageData: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private backendService: BackendApiService,
    private router: Router) {
    let sessionId = Cookie.get('sessionId');
    this.backendService.getAvatarData(sessionId, this.backendService.getUserIdFromToken(sessionId)).subscribe(
      data => {
        let jsonParsed = JSON.parse(JSON.stringify(data));
        this.imageData = jsonParsed.image;
      },
      error => console.error('ERROR: BackendService - getAvatarData()')
    );
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let userId = params['user'];
      this.backendService.getUserInfoFromId(Cookie.get('sessionId'), userId).subscribe(
        res => {
          if (res.status == 500) {
            this.router.navigateByUrl('/404');
          }
          else {
            let json = res.json();
            let jsonParsed = JSON.parse(JSON.stringify(json));
            console.log(jsonParsed);
            this.firstname = jsonParsed.firstName;
            this.lastname = jsonParsed.lastName;
            this.userRating = Math.floor(jsonParsed.user_rating / 20);
            this.transporterRating = Math.floor(jsonParsed.transporter_rating / 20);
            this.county = jsonParsed.county;
            this.city = jsonParsed.city;
            
            this.updateRatingStars();

            let date = new Date(jsonParsed.dateJoined);
            this.dateJoined = date.toISOString().substr(0, 19).replace('T', ' ');

          }
        }
      );
    });
  }

  updateRatingStars() {
    this.filledUserRatingStars = new Array(3).fill(1);
    this.emptyUserRatingStars = new Array(/*5 - this.userRating*/ 2).fill(1);
    this.filledTransRatingStars = new Array(/*this.transporterRating*/ 4).fill(1);
    this.emptyTransRatingStars = new Array(/*5 - this.transporterRating*/ 1).fill(1);
  }

}
