import { Component, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(){

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