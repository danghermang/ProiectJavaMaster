import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { BackendApiService } from '../../services/backend-api.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
	selector: 'yuso-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.css'],
	host: { '(document:click)': 'onDocumentClick($event)' }
})
export class TopbarComponent {
	menubox_visible: boolean = false;
	document_click_can_deactivate: boolean = false;
	document_timeout: any;
	name_display: string;

	imageData: string = '';

	constructor(private backendService: BackendApiService, private router: Router,private domSanitizer: DomSanitizer) {
		let sessionIdToken = Cookie.get('sessionId');

		if (sessionIdToken == null) {
			this.name_display = '';
		}
		else {
			
			let sessionId = Cookie.get('sessionId');

			backendService.getUserInfoFromId(sessionId, backendService.getUserIdFromToken(sessionId)).subscribe(
				res => {
					let json = res.json();
					let jsonParsed = JSON.parse(JSON.stringify(json));
					this.name_display = jsonParsed.firstName + ' ' + jsonParsed.lastName;
				}, 	error => alert(error)
			);

			backendService.getAvatarData(sessionId, this.backendService.getUserIdFromToken(sessionId)).subscribe(
				data => {
					let jsonParsed = JSON.parse(JSON.stringify(data));
					this.imageData = jsonParsed.image;
					domSanitizer.bypassSecurityTrustUrl(this.imageData);
				},
				error => console.error('ERROR: BackendService - getAvatarData()')
			);
		}
	}

	onProfileClick() {
		this.menubox_visible = !this.menubox_visible;
		this.document_click_can_deactivate = false;
		this.document_timeout = setTimeout(() => { this.document_click_can_deactivate = true }, 5);
	}

	onDocumentClick(event: any) {
		if (this.document_click_can_deactivate && event.target.id != 'profile_menubox_d' &&
			event.target.id != 'profile_menubox_u') {
			this.menubox_visible = false;
			this.document_click_can_deactivate = false;
		}
	}

	onSettingsBtnClick() {
		this.router.navigateByUrl('/settings');
	}

	onProfileBtnClick() {
		this.router.navigate(['/profile'], { queryParams: { user: this.backendService.getUserIdFromToken(Cookie.get('sessionId')) } });
	}

	onLogoutClick() {
		Cookie.delete('sessionId');
		this.router.navigateByUrl('/login');
	}

}
