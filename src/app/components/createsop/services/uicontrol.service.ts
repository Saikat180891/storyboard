import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class UicontrolService {
  // private openSidebar = new BehaviorSubject<boolean>(false);

  // getSidebarStatus():Observable<boolean>{
  //   return this.openSidebar.asObservable();
  // }

  // setSidebarStatus(status:boolean){
  //   this.openSidebar.next(status);
  // }

  constructor() { }
}
