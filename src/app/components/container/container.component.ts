import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { trigger, transition, style, animate, state } from '@angular/animations';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  animations:[
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
])
  ]
})

export class ContainerComponent implements OnInit {
  filesLists: string[] = ['Recent Files', 'All Files'];
  selected;
  cards = [1,2,3,4,5,6,7,8,9,10];
  cardDatas;



  constructor(private dataService: DataService) { 
    this.cardDatas = this.dataService.getData();
  }

  ngOnInit() {
    //console.log(this.cardDatas)
  }

  state: string = 'default';

    rotate() {
        this.state = (this.state === 'default' ? 'rotated' : 'default');
    }


}
