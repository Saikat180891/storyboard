import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ScrollbarService } from '../services/scrollbarService/scrollbar.service';
import {fromEvent} from 'rxjs';
import {Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import {HeaderService} from '../components/header/header.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('routerElement') routerElement:ElementRef
  loading:boolean = false;
  constructor(
    private __scrollbar:ScrollbarService,
    private router:Router,
    private _header:HeaderService) { }

  ngOnInit() {
    // console.log(this.routerElement.nativeElement)

    fromEvent(this.routerElement.nativeElement, 'scroll')
        .subscribe((res:any) => {
          this.__scrollbar.setScrollPosition(res.target.scrollTop)
          // this.__scrollbar.scrollbarPosition = res.target.scrollTop;
          // this.__scrollbar.broadCastScrollPosition.subscribe(res=>{
          //   console.log(res);
          // })
    });
  }

  ngAfterViewInit(){
    this.router.events.subscribe((event)=>{
      console.log(event)
      if(event instanceof NavigationStart) {
        this.loading = true;
        this._header.loading = true;
        // console.log(this.loading)
    }
    else if (
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel
        ) {
        this.loading = false;
        this._header.loading = false;
        // console.log(this.loading)
    }
    })
  }

}
