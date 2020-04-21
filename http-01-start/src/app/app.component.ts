import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching=false;
  error=null;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() 
  {
    this.fetchPosts();
  }

  ngOnDestroy(): void 
  {
    this.postService.error.unsubscribe();
  }

  onCreatePost(postData: Post) 
  {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() 
  {
    this.fetchPosts();
  }

  onClearPosts() 
  {
    this.postService.deletePosts()
    .subscribe(()=>
    {
      this.loadedPosts=[];
    });
  }

  fetchPosts()
  {
    this.postService.error
    .subscribe(errorMessage=>
      {
        this.error=errorMessage;
      });
    this.isFetching=true;
    this.postService.fetchPosts()
    .subscribe(posts=>
      {
        this.isFetching=false;
        this.loadedPosts=posts;
      }, error=>
      {
        this.isFetching=false;
        this.error=error.message;
      });
  }

  onHandleError()
  {
    this.error=null;
  }
}
