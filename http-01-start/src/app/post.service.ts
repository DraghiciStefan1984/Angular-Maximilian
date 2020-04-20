import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class PostService
{
    url='https://http-01-start-865c5.firebaseio.com/posts.json';
    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string)
    {
        const postData: Post={title:title, content:content};

        this.http.post<{name:string}>(this.url, postData)
        .subscribe(responseData=>
            {
                console.log(responseData);
            });
    }

    fetchPosts()
    {
        return this.http.get<{[key: string]:Post}>(this.url)
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
        })
        );
    }

    deletePosts()
    {
        return this.http.delete(this.url);
    }
}