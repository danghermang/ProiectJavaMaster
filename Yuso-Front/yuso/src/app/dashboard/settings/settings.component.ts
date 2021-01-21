import { Component } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AlertPopupComponent } from '../../alert-popup/alert-popup.component';

@Component({
    selector: 'yuso-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    email: string = '';
    firstName: string = '';
    lastName: string = '';
    address: string = '';
    country: string = '';
    city: string = '';
    phoneNumber: string = '';
    postalCode: string = '';
    oldPassword: string = '';
    newPassword: string = '';
    confirmPassword: string = '';

    userData: any;

    files: FileList = null;

    headings_array = [
        { name: 'General', selected: true },
        { name: 'Personal Information', selected: false },
        { name: 'Profile Picture', selected: false }
    ];

    selectedItem = 0;
    imageData: string = '';

    constructor(private backendSerivce: BackendApiService, private router: Router, private modalService: NgbModal) {
        let sessionId = Cookie.get('sessionId');
        if (sessionId == null)
            return;

        this.backendSerivce.getUserInfoFromId(sessionId, this.backendSerivce.getUserIdFromToken(sessionId)).subscribe(
            res => {
                let json = res.json();
                let jsonParsed = JSON.parse(JSON.stringify(json));
                this.firstName = jsonParsed.firstName;
                this.lastName = jsonParsed.lastName;
                this.country = jsonParsed.county;
                this.city = jsonParsed.city;
                this.phoneNumber = jsonParsed.phone;
                this.postalCode = jsonParsed.postalCode;
                this.address = jsonParsed.address;
                this.email = backendSerivce.getEmailFromToken(sessionId);
            },
            error => console.error('ERROR: BackendService - getUserInfoFromId()')
        );

        this.backendSerivce.getAvatarData(sessionId, this.backendSerivce.getUserIdFromToken(sessionId)).subscribe(
            data => {
                let jsonParsed = JSON.parse(JSON.stringify(data));
                this.imageData = jsonParsed.image;
            },
            error => console.error('ERROR: BackendService - getAvatarData()')
        );
    }
    onHeadingClick(index: any) {
        this.headings_array[this.selectedItem].selected = false;
        this.selectedItem = index;
        this.headings_array[this.selectedItem].selected = true;
    }

    showAlert(message: string) {
        const modalRef = this.modalService.open(AlertPopupComponent);
        modalRef.componentInstance.text = message;
      }

    onChangePassBtnClick() {
        if (this.oldPassword.length < 4 || this.newPassword.length < 4 || this.confirmPassword.length < 4) {
            this.showAlert('Password length must be atleast 8 characters long!');
            return;
        }

        if (this.newPassword != this.confirmPassword) {
            this.showAlert('New password and confirm password do not match!');
            return;
        }

        this.backendSerivce.changePassword(Cookie.get('sessionId'), this.oldPassword, this.newPassword).subscribe(
            res => {
                if (res.status == 200) {
                    this.showAlert('Password has been changed successfully!');
                }
                else {
                    this.showAlert('Invalid old password!');
                }
            },
            error => this.showAlert('Invalid old password!')
        );
    }

    onSavePersInfoBtnClick() {
        this.backendSerivce.updateProfileInfo(Cookie.get('sessionId'), this.firstName, this.lastName, this.address,
            this.city, this.country, this.postalCode, this.phoneNumber).subscribe(
                res => {
                    location.reload();
                }
            );
    }

    onFileChange(event: any) {
        this.files = event.target.files;
    }

    saveProfilePicture() {
        if (this.files == null) {
            this.showAlert('You must select an avatar picture!');
        }

        let reader = new FileReader();
        reader.onload = this.fileReaderLoadHandler.bind(this);
        reader.readAsBinaryString(this.files[0]);
    }

    fileReaderLoadHandler(event: any) {
        let binaryString = event.target.result;
        let fileData = btoa(binaryString);

        this.backendSerivce.setAvatar(Cookie.get('sessionId'), fileData).subscribe(
            res => {
                location.reload();
            }
        );
    }
}
