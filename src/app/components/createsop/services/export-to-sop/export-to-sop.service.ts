import { Injectable } from '@angular/core';
interface Screen {
  id: number;
  image_id: number;
  screen_name: string;
  application_name: string;
  tab_name: string;
}
@Injectable({
  providedIn: 'root'
})
export class ExportToSopService {
  private screenList: Screen[] = [];

  constructor() { }

  appendScreen(data: Screen) {
    this.screenList.push(data);
  }

  updateScreen(index: number, data: Screen) {
    this.screenList[index] = data;
  }

  deleteScreen(index: number) {
    this.screenList.splice(index, 1);
  }

  insertScreen(index: number, data: Screen) {
    this.screenList.splice(index , 0, data);
  }
}
