import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, AfterViewChecked, OnChanges, EventEmitter, Output  } from '@angular/core';
import {ReasonCodeService} from '../reason-code.service';
import {fromEvent} from 'rxjs';

declare let d3: any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class ChartsComponent implements OnInit, AfterViewChecked, OnChanges {
  @Input('options') options;
  @Input('data') data;
  @Input('title') title;
  @Input('selectOptions') selectOptions;
  @Input('meter') meter:boolean;
  @Input('projectStatus') projectStatus;
  @Input('extras') extras:boolean;
  @Input('ifButtonRequired') ifButtonRequired:boolean = false;
  @Output('onClick') onClick = new EventEmitter<any>();
  selectedSprint;

  @ViewChild('dimensionController') dimensionController: ElementRef;

  // options;
  // data;

  constructor(private _rcService: ReasonCodeService) { }

  onSelect(id){
    this.selectedSprint = id;
    this._rcService.getChartData(id);
  }

  ngAfterViewChecked(){
    
  }

  ngOnChanges(){
    
  }

  onButtonClick(){
    this.onClick.emit(true);
  }
  
  ngOnInit() {
    // console.log("XYZ",this.dimensionController.nativeElement.parentNode.parentNode.clientWidth)
    fromEvent(window, 'resize')
    .subscribe(res => {
    this.options.chart.width = this.dimensionController.nativeElement.parentNode.parentNode.clientWidth;
    console.log(this.options)
    });
    // console.log(this.options)
    this.options.chart.width = this.dimensionController.nativeElement.parentNode.parentNode.clientWidth;
    //.nativeElement.parentNode.parentNode.clientWidth
  //   this.options = {
  //     chart: {
  //         type: 'pieChart',
  //         height: 200,
  //         width: 400,
  //         margin: {
  //           top: 10,
  //           right: 10,
  //           bottom: 10,
  //           left: 10
  //         },
  //         x: function(d){return d.key;},
  //         y: function(d){return d.y;},
  //         showLabels: false,
  //         duration: 500,
  //         donutRatio: 0.6,
  //         donut:true,
  //         legendPosition: 'right',
  //         // title: 'Hello',
  //         labelThreshold: 0.07,
  //         labelSunbeamLayout: true,
  //         legend: {
  //           margin: {
  //             top: 20,
  //             right: 10,
  //             bottom: 0,
  //             left: 20
  //           },
  //           width: 50,
  //           height: 200,
  //           rightAlign: true
  //         }
  //     }
  // };

  //   this.data = [
  //     {
  //         key: "Backlog",
  //         y: 5
  //     },
  //     {
  //         key: "Rules",
  //         y: 2
  //     },
  //     {
  //         key: "Intl Testing",
  //         y: 9
  //     },
  //     {
  //         key: "Ext Testing",
  //         y: 7
  //     },
  //     {
  //         key: "Done",
  //         y: 4
  //     }
  // ];

  }

}
