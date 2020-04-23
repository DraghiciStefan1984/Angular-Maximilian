import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

export interface AuthResponseData
{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService
{
    user=new BehaviorSubject<User>(null);
    api_key='AIzaSyD6WQocxWlJ1UnkavQKs2L7R86K1lYCRdA';
    signup_url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    login_url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

    constructor(private http: HttpClient){}

    signup(email: string, password: string)
    {
        return this.http.post<AuthResponseData>(this.signup_url+this.api_key, 
            {email: email, password: password, returnSecureToken: true})
            .pipe(catchError(this.handleError), 
            tap(resData=>
            {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    login(email: string, password: string)
    {
        return this.http.post<AuthResponseData>(this.login_url+this.api_key, 
            {email: email, password: password, returnSecureToken: true})
            .pipe(catchError(this.handleError), 
            tap(resData=>
            {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    private handleError(errorRes: HttpErrorResponse)
    {
        let errorMessage='Unknown error...';
        if(!errorRes.error || !errorRes.error.error)
        {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message)
        {
            case 'EMAIL_EXISTS':
                errorMessage='This email already exists.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage='This email was not found.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage='This password is not correct.';
                break;
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number)
    {
        const expirationDate=new Date(new Date().getTime()+expiresIn*1000);
        const user=new User(email, userId, token, expirationDate);
        this.user.next(user);
    }
}