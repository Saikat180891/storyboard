import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class UicontrolService {
  videoProgress = new BehaviorSubject<number>(0);

  setProgress(progressPercent:number){
    this.videoProgress.next(progressPercent);
  }

  getProgress(){
    return this.videoProgress;
  }

  constructor() { }
}
