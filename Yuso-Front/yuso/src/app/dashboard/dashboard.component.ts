import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from "@angular/router";

@Component({
  selector: 'yuso-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(private router: Router) {
    if (Cookie.get('sessionId') == null) {
      this.router.navigateByUrl('/login');
      return;
    }
  }
}
