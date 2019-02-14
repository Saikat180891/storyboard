import { Injectable } from '@angular/core';
import {DataService} from '../../data.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  loading:boolean = false;
  constructor(private _api:DataService) { }

}
