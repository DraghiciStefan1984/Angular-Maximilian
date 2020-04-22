import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData
{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn:'root'})
export class AuthService
{
    api_key='AIzaSyD6WQocxWlJ1UnkavQKs2L7R86K1lYCRdA';
    signup_url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
    constructor(private http: HttpClient){}

    signup(email: string, password: string)
    {
        return this.http.post<AuthResponseData>(this.signup_url+this.api_key, 
            {email: email, password: password, returnSecureToken: true});
    }
}