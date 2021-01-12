import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from "../../../../shared/services";
import { LoginService } from "../../../services/sign-in.service";


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    constructor(
        private alertService: AlertService,
        private loginService: LoginService,
        private router: Router

    ) { }

    error: any;
    userName: string;
    pwd: string;
    ngOnInit() { }
    isLoading = false;

    login(): void {
        this.isLoading = true;
        this.loginService.login(this.userName, this.pwd).subscribe((data: any) => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('access_user', JSON.stringify(data));
            localStorage.setItem('translate', 'en');
            this.checkTokenLogin(data.access_token);
            setTimeout(() => this.router.navigateByUrl('/pages/home'), 300);
        },
            (err) => {
                this.error = err;
                console.log(err);
                this.isLoading = false;
            }
            , () => {
                this.alertService.changeMessage({
                    color: 'green',
                    text: `Welcome!`
                });
                this.isLoading = false;
            }
        );
    }

    checkTokenLogin(token) {
        this.loginService.checkToken(token).subscribe(res => {
            localStorage.setItem('Position', JSON.stringify(res));
        });
    }
}
