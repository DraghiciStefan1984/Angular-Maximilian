import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn:'root'})
export class PostService
{
    url='https://http-01-start-865c5.firebaseio.com/posts.json';
    error=new Subject<string>();

    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string)
    {
        const postData: Post={title:title, content:content};

        this.http.post<{name:string}>(this.url, postData,
          {
            observe: 'body'
          })
        .subscribe(responseData=>
            {
                console.log(responseData);
            }, error=> 
            {
              this.error.next(error.message);
            });
    }

    fetchPosts()
    {
      let searchParams=new HttpParams();
      searchParams=searchParams.append('print', 'pretty');

        return this.http.get<{[key: string]:Post}>(this.url,
          {
            headers: new HttpHeaders({'custom-header':'hello'}),
            params: new HttpParams().set('print', 'pretty')
          })
        .pipe(
            map(responseData=>
        {
          const postsArray: Post[]=[];
          for(const key in responseData)
          {
            if(responseData.hasOwnProperty(key))
            {
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        }),
        catchError(errorRes=>
          {
            return throwError(errorRes);
          })
        );
    }

    deletePosts()
    {
        return this.http.delete(this.url,
          {
            observe:'events',
            responseType: 'json'
          })
          .pipe(
            tap(event=>
              {
                console.log(event);
                if(event.type===HttpEventType.Response)
                {
                  console.log(event.body);
                }
              })
          );
    }
}