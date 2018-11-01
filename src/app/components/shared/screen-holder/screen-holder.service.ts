import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenHolderService{
  addNewScreen: boolean = false;

  carousal = [];
}
