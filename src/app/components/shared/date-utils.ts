export abstract class DateUtils {
  /**
   * Get the date as a string and then split the string using
   * the "/" then using the date, month and year
   * set the due date in the editSelectedDate property
   * @param date
   */
  public static arrangeDateInCorrectFormat(date) {
    if (date === null || date === undefined) {
      return null;
    }
    const newDate = date.toString().split("/");
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
  public static datetypeToStringWithTime(date) {
    const myDate = new Date(date);
    return `${myDate.getFullYear()}-${myDate.getMonth() +
      1}-${myDate.getDate()} 00:00:00`;
  }

  /**
   * Changes Date Object to String (YYYY-mm-dd) to send to Backend
   * @param date: Date Object
   */
  public static datetypeToStringWithoutTime(date) {
    const myDate = new Date(date);
    return `${myDate.getFullYear()}-${myDate.getMonth() +
      1}-${myDate.getDate()}`;
  }

  /**
   * Changes Date to US Format to display mm/dd/YYYY
   * @param date: Date with YYYY-mm-dd
   */
  public static formatDateToUS(date) {
    const myDate = new Date(date);
    return `${myDate.getMonth() +
      1}/${myDate.getDate()}/${myDate.getFullYear()}`;
  }
}

export function changeBackSlashToHypenFormatOfDate(date: string) {
  return date.split("/").join("-");
}

export function changeHypenToBackSlashFormatOfDate(date: string) {
  return date.split("-").join("/");
}

export function formatToUSDate(date: string, splitBy: string = "/") {
  const dateArray = date.split(splitBy);
  return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
}

export function arrangeEndDateForBackend(date: string) {
  const endDate = date.split("/");
  const yyyy = endDate[2];
  const mm = endDate[0];
  const dd = endDate[1];
  return `${yyyy}-${mm}-${dd}`;
}

export function convertDateforBackend(date: Date) {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return `${yyyy}-${mm}-${dd}`;
}
