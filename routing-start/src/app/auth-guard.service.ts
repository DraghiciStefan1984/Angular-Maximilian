import { AuthService } from './auth.service';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthenticated().then(
            (authenticated: boolean)=>{
                if(authenticated){return true;}
                else{this.router.navigate(['/']);}
            }
            );
    }
}