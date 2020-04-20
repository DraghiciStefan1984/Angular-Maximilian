import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) 
  {
    console.log(postData);
    this.http.post('https://http-01-start-865c5.firebaseio.com/posts.json', 
                    postData).subscribe(responseData=>{
                      console.log(responseData);
                    });
  }

  onFetchPosts() 
  {
  }

  onClearPosts() 
  {
  }
}
