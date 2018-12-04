import { Injectable } from '@angular/core';
import {DataService} from '../../data.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private _api:DataService) { }

  getUserName(){
    this._api.fetchData('https://graph.windows.net/User.Read')
      .subscribe(response=>{
        console.log("Username: ",response);
      })
  }
}
