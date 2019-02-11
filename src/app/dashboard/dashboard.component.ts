import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ScrollbarService } from '../services/scrollbarService/scrollbar.service';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('routerElement') routerElement:ElementRef

  constructor(private __scrollbar:ScrollbarService) { }

  ngOnInit() {
    console.log(this.routerElement.nativeElement)

    fromEvent(this.routerElement.nativeElement, 'scroll')
        .subscribe((res:any) => {
          this.__scrollbar.setScrollPosition(res.target.scrollTop)
          // this.__scrollbar.scrollbarPosition = res.target.scrollTop;
          // this.__scrollbar.broadCastScrollPosition.subscribe(res=>{
          //   console.log(res);
          // })
    });
  }

}
