import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  steptype:string;

  execute(fn){
    fn();
  }

  constructor() { }
}
