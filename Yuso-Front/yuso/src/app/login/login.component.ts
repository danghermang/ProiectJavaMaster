import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { Router } from "@angular/router";
import { Cookie } from "ng2-cookies/ng2-cookies";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';

interface LoginFormData {
  email: string,
  password: string
}

@Component({
  selector: 'yuso-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormData: LoginFormData;

  constructor(private backendService: BackendApiService, private router: Router, private modalService: NgbModal) {
    if (Cookie.get('sessionId') != null)
      this.router.navigateByUrl('/');
  }
  showAlert(message: string) {
    const modalRef = this.modalService.open(AlertPopupComponent);
    modalRef.componentInstance.text = message;
  }

  ngOnInit() {
    this.loginFormData = { email: '', password: '' };
  }
  onLoginClick() {
    this.backendService.login(this.loginFormData.email, this.loginFormData.password).subscribe(
      res => {
        if (res.status == 400) {
          this.showAlert('Incorect email or password!');
        }
        else {
          let json = res.json();
          let jsonParsed = JSON.parse(JSON.stringify(json));
          Cookie.set('sessionId', jsonParsed.token);
          this.router.navigateByUrl('/');
        }
      },
      error => this.showAlert('Incorect email or password!')
    );
  }
}
