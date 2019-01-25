import { Component, Output, EventEmitter, ElementRef, OnInit, HostListener, ViewChild } from '@angular/core';
import {fromEvent} from 'rxjs';
import {ScrollbarService} from './services/scrollbarService/scrollbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('routerElement') routerElement:ElementRef

  constructor(private __scrollbar:ScrollbarService){

  }
  ngOnInit(){
    // let refreshClearInterval;
    // this.el.nativeElement.addEventListener("click", function() { 
    //   clearInterval(refreshClearInterval);
    //   refresh();
    // });

    // function refresh(){
    //   refreshClearInterval = setInterval(()=>{
    //     window.location.reload();
    //   }, 3000);
    // }
    // refresh();
    console.log(this.routerElement.nativeElement)

    fromEvent(this.routerElement.nativeElement, 'scroll')
        .subscribe((res:any) => {
          this.__scrollbar.setScrollPosition(res.target.scrollTop)
          // this.__scrollbar.scrollbarPosition = res.target.scrollTop;
          // console.log(this.__scrollbar.scrollbarPosition);
        });

  }  
}
