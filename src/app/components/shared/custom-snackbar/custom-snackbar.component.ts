import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import {SnackbarService} from './snackbar.service';

@Component({
  selector: 'snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit, OnDestroy {
  active:boolean = false;
  
  @Input('messageTitle') messageTitle:string;
  @Input('messageBody') messageBody:string;
  @Input('timeDelay') timeDelay:number;

  closeOverlay:boolean = true;

  @Output('closeSnackBar') closeSnackBar = new EventEmitter<boolean>();
  constructor(private snackbar:SnackbarService) { }

  ngOnInit() {
    this.onClick();
  }

  ngOnDestroy(){

  }

  onClick(){
    this.snackbar.active = !this.snackbar.active;
    setTimeout(()=>{
      this.snackbar.active = false;
      this.closeOverlay = false;
    }, this.timeDelay);
  }

  onClose(){
    this.closeSnackBar.emit(false);
  }

}
