import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, 
                                                AfterContentInit, AfterContentChecked,
                                                AfterViewInit, AfterViewChecked,
                                                OnDestroy {
  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;

  constructor() {
    console.log('contructor called');
   }

  ngOnInit(): void {
    console.log('OnInit called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges called');
  }

  ngDoCheck(): void {
    console.log('DoCheck called');
  }

  ngAfterContentInit(): void {
    console.log('AfterContentInit called');
  }

  ngAfterContentChecked(): void {
    console.log('AfterContentChecked called');
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit called');
  }

  ngAfterViewChecked(): void {
    console.log('AfterViewChecked called');
  }

  ngOnDestroy(): void {
    console.log('OnInit called');
  }
}
