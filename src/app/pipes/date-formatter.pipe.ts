import { Pipe, PipeTransform } from "@angular/core";
import { convertStartDateforBackend } from "../components/shared/date-utils";

@Pipe({
  name: "dateFormatter",
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return convertStartDateforBackend(new Date(value));
  }
}
