import { Injectable } from '@angular/core';


interface ScreenData{
  screen?: FormData,
  steps?: Array<Object>
}
@Injectable({
  providedIn: 'root'
})
export class ScreenHolderService{
  addNewScreen: boolean = false;
  ifEdit:boolean =true;
  carousal = [];

  carousal2: ScreenData[] = [];
  currentScreen = null;
  steps = [];

  payload: any;
  position:number = 0;

  sections;
}
interface Payload{
  applicationName: string
  id: number
  image_url: string
  screenHeight: number
  screenImage: string
  screenName: string
  screenWidth: number
  tabName: number
}