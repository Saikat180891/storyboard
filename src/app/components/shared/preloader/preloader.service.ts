import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService{
  openPreloader:boolean = false;

  constructor() { }
}
