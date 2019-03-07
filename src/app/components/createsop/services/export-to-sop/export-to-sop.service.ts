import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportToSopService {
  private screenList = [];

  constructor() { }

  appendScreen(data: any) {
    this.screenList.push(data);
  }

  updateScreen(index: number, data: any) {
    this.screenList[index] = data;
  }

  deleteScreen(index: number) {
    this.screenList.splice(index, 1);
  }

  insertScreen(index: number, data: any) {
    this.screenList.splice(index , 0, data);
  }
}
