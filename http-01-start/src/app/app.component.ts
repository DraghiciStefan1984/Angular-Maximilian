import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  url='https://http-01-start-865c5.firebaseio.com/posts.json';
  isFetching=false;

  constructor(private http: HttpClient) {}

  ngOnInit() 
  {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) 
  {
    console.log(postData);
    this.http.post(this.url, postData).subscribe(
      responseData=>{
                      console.log(responseData);
                    });
  }

  onFetchPosts() 
  {
    this.fetchPosts();
  }

  onClearPosts() 
  {
  }

  private fetchPosts()
  {
    this.isFetching=true;
    this.http.get<{[key: string]:Post}>(this.url)
    .pipe(map(responseData=>{
      const postsArray=[];
      for(const key in responseData)
      {
        if(responseData.hasOwnProperty(key))
        {
          postsArray.push({...responseData[key], id: key});
        }
      }
      return postsArray;
    })
    )
    .subscribe(posts=>{
      this.isFetching=false;
      console.log(posts);
    });
  }
}
