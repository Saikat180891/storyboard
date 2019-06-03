import { Pipe, PipeTransform } from "@angular/core";
import { convertDateforBackend } from "../components/shared/date-utils";

@Pipe({
  name: "dateFormatter",
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return convertDateforBackend(new Date(value));
  }
}
