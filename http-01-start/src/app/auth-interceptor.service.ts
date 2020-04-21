import { tap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        console.log('request is on its way.');
        const modifiedRequest=req.clone({headers: req.headers.append('auth', '888')});
        return next.handle(modifiedRequest)
        .pipe(tap(event=>
            {
                if(event.type===HttpEventType.Response)
                {
                    console.log('response arrived, response body:');
                    console.log(event.body);
                }
            }));
    }

}