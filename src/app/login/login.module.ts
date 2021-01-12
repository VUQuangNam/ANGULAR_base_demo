import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './components/forms/forgot-password/forgot-password.component';
import { SignInComponent } from './components/forms/sign-in/sign-in.component';
import { SignUpComponent } from './components/forms/sign-up/sign-up.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    declarations: [
        LoginRegisterComponent,
        SignUpComponent,
        SignInComponent,
        ForgotPasswordComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule
    ]
})
export class LoginModule { }
