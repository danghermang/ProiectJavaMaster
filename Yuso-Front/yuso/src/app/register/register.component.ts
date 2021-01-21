import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { BackendApiService } from '../services/backend-api.service';

interface RegisterFormData {
    email: string;
    password: string;
}

@Component({
    selector: 'yuso-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerFormData: RegisterFormData;

    lastName: string = "";
    firstName: string = "";
    email: string = "";
    password: string = "";
    repeatPassword: string = "";
    county: string = "";
    city: string = "";
    postalCode: string = "";
    phoneNumber: string = "";
    address: string = "";

    constructor(private backendService: BackendApiService, private router: Router) {
        if (Cookie.get("sessionId") != null)
            this.router.navigateByUrl("/");
    }

    ngOnInit() {
        this.registerFormData = { email: "", password: "" };
    }

    onRegisterClick() {
        if (this.lastName == "" || this.firstName == "" || this.email == "" || this.password == "" || this.repeatPassword == "" ||
            this.county == "" || this.city == "" || this.postalCode == "" || this.phoneNumber == "") {
            alert("All fields are required in order to register!");
            return;
        }

        if (this.password != this.repeatPassword) {
            alert("Passwords do not match!");
            return;
        }

        this.backendService.register(this.email, this.password, this.firstName, this.lastName, this.address,
            this.city, this.county, this.postalCode, this.phoneNumber).subscribe(
            res => {
                        alert("The account has been created!");
                        this.router.navigateByUrl("/login");
            },
            error => alert("The account has not been created!" + error)
        );
    }
}
