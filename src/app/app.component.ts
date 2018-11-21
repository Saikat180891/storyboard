import { Component, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import {AppcontrolService} from './controlservice/appcontrol.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _constrolService:AppcontrolService,
              private el:ElementRef){

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

  }  
}