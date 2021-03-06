import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObservableSubscription: Subscription;
  constructor() { }

  ngOnInit() 
  {
    // this.firstObservableSubscription = interval(1000).subscribe
    // (
    //   count=>{console.log(count);}
    // );
    const customIntervalObservable=Observable.create(observer=>{
      let count=0;
      setInterval(()=>{
        observer.next(count);
        if(count===2)
        {
          observer.complete();
        }
        if(count>3)
        {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    customIntervalObservable.pipe(map((data:number)=>{
      return 'round: '+(data+1);
    }));

    this.firstObservableSubscription=customIntervalObservable.subscribe(data=>
    {
      console.log(data);
    }, error=>
    {
      alert(error.message);
    });
  }

  ngOnDestroy(): void 
  {
    this.firstObservableSubscription.unsubscribe();
  }
}
