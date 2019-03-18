import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor() {}

  /**
   * Get the date as a string and then split the string using
   * the "/" then using the date, month and year
   * set the due date in the editSelectedDate property
   * @param date
   */
  arrangeDateInCorrectFormat(date) {
    const newDate = date.toString().split("/");
    console.log(newDate);
    const currentDate = new Date();
    currentDate.setFullYear(Number(newDate[2]));
    currentDate.setMonth(Number(newDate[0]) - 1);
    currentDate.setDate(Number(newDate[1]));
    return currentDate;
  }

  /**
   * Changes Date Object to String(YYYY-mm-dd 00:00:00) with time as 00:00:00 to send to Backend
   * @param date: Date Object
   */
  datetypeToStringWithTime(date) {
    const myDate = new Date(date);
    return (
      myDate.getFullYear() +
      "-" +
      (myDate.getMonth() + 1) +
      "-" +
      myDate.getDate() +
      " 00:00:00"
    );
  }

  /**
   * Changes Date Object to String (YYYY-mm-dd) to send to Backend
   * @param date: Date Object
   */
  datetypeToStringWithoutTime(date) {
    const myDate = new Date(date);
    return (
      myDate.getFullYear() +
      "-" +
      (myDate.getMonth() + 1) +
      "-" +
      myDate.getDate()
    );
  }

  /**
   * Changes Date to US Format to display mm/dd/YYYY
   * @param date: Date with YYYY-mm-dd
   */
  formatDateToUS(date) {
    const myDate = new Date(date);
    // console.log(myDate)
    return (
      myDate.getMonth() +
      1 +
      "/" +
      myDate.getDate() +
      "/" +
      myDate.getFullYear()
    );
  }
}
