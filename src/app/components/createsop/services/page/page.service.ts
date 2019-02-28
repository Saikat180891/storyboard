import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  projectId:number;
  userStoryId:number;
  videoId:number;
  imageGalleryContent = [];
  shouldShowExportToSopModal:boolean = false;
  constructor() { }
}
