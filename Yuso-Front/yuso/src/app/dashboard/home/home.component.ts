import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BackendApiService } from '../../services/backend-api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'yuso-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    firstName: string = '';
    lastName: string = '';
    unreadMessages: number;
    activeJobs: number;
    balance: number;
    imageData: string = '';

    constructor(private backendApiService: BackendApiService, private domSanitizer: DomSanitizer) {
        let sessionId = Cookie.get('sessionId');
        if (sessionId == null)
            return;

        this.backendApiService.getUserInfoFromId(sessionId, this.backendApiService.getUserIdFromToken(sessionId)).subscribe(
            res => {
                let json = res.json();
                let jsonParsed = JSON.parse(JSON.stringify(json));
                this.firstName = jsonParsed.firstName;
                this.lastName = jsonParsed.lastName;
                this.unreadMessages = 3/*jsonParsed.unread_pm*/;
                this.activeJobs = 4/*jsonParsed.active_jobs*/;
                this.balance = 300/*jsonParsed.balance*/;
            },
            error => console.error('ERROR: BackendService - getUserInfoFromId()')
        );

        backendApiService.getAvatarData(sessionId, this.backendApiService.getUserIdFromToken(sessionId)).subscribe(
            data => {
                let jsonParsed = JSON.parse(JSON.stringify(data));
                this.imageData = jsonParsed.image;
                domSanitizer.bypassSecurityTrustUrl(this.imageData);
            },
            error => console.error('ERROR: BackendService - getAvatarData()')
        );
    }
}
