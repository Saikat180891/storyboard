import { Component, OnInit } from '@angular/core';
import {PreloaderService} from './preloader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

  constructor(private _preloaderService: PreloaderService) { }

  preventPropagation(event){
    event.stopPropagation();
    event.preventDefault();
  }

  ngOnInit() {
  }

}
