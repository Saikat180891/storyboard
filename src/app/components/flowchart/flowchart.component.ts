import { Component, OnInit, AfterViewInit, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent implements OnInit, AfterViewInit {
  private mouseDown:boolean = false;
  private add:boolean = false;

  private startX:number;
  private startY:number;

  private endX:number;
  private endY:number;

  private Largedivs:boolean[];
  private Samlldivs:boolean[];

  flowboard: HTMLImageElement;
/*
  @HostListener('window:scroll', ['$event'])
    checkScroll(e) {
      const componentPosition = this.el.nativeElement;
      const scrollPosition = window.pageYOffset;
      console.log(e)
      e.stopPropagation();
      e.preventDefault();

    }
*/
  constructor(public el: ElementRef, private render:Renderer2) { 
    //console.log(document.body)
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    
  }

  onMouseDown(event){
    console.log("pressed")
    this.mouseDown = true;
    this.startX = event.offsetX;
    this.startY = event.offsetY;
  }

  onMouseUp(event){
    this.mouseDown = false
    console.log("released")
    this.endX = event.offsetX;
    this.endY = event.offsetY;
  } 

  onMouseMove(){
    //console.log("mouseover")
    let f = function(){

      function eventHandler(event){
          let width = parseInt(window.getComputedStyle(this).width);
          let height = parseInt(window.getComputedStyle(this).height);
          let zoom = 20;
  
          if(event.wheelDelta > 0){
              this.style.width = Math.min(1500,width + zoom) + "px";
              this.style.height = Math.min(1500,height + zoom) + "px";
          }
          else{
              this.style.width = Math.max(200,width - zoom) + "px";
              this.style.height = Math.max(200,height - zoom) + "px";
  
          }
          event.preventDefault();
      }
  
      let imageElement = document.querySelector('.flowboard');
      imageElement.addEventListener('mousewheel',eventHandler,false);
  };

  f();
  
  //window.addEventListener('mouseover',f,false);
  }

  onbtn(){
    this.add = true;
  }

}