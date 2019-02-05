import { Injectable } from '@angular/core';
import {DataService} from '../../data.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private _api:DataService) { }

}
