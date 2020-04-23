import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent
{
    isLoginMode=true;
    isLoading=false;
    error=null;
    
    constructor(private authService: AuthService,
                private router: Router){}

    onSwitchMode()
    {
        this.isLoginMode=!this.isLoginMode;
    }

    onSubmit(form: NgForm)
    {
        if(!form.valid)
        {
            return;
        }

        const email=form.value.email;
        const password=form.value.password;
        this.isLoading=true;
        let authObservable: Observable<AuthResponseData>;

        if(this.isLoginMode)
        {
            authObservable=this.authService.login(email, password);
        }
        else
        {
            authObservable=this.authService.signup(email, password);
        }
        authObservable.subscribe(resData=> 
            {
                console.log(resData);
                this.isLoading=false;
                this.router.navigate(['/recipes']);
            }, errorMessage=>
            {
                console.log(errorMessage);
                this.error=errorMessage;
                this.isLoading=false;
            });
        form.reset();
    }
}