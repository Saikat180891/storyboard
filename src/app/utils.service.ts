import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Changes Date Object to String to send to Backend
   * @param date: Date Object
   */
  datetypeToStringtype(date){
      let myDate = new Date(date);
      return myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
  }
  
  formatDateToUS(date){
    let myDate = new Date(date);
    // console.log(myDate)
    return (myDate.getMonth()+1)+"/"+myDate.getDate()+"/"+myDate.getFullYear();
  }

}
