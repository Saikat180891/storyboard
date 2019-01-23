import { Directive, ElementRef, OnInit, Renderer2, HostBinding, Input,  } from '@angular/core';
import {ContainerService} from '../components/projects/container/container.service'
@Directive({
  selector: '[appCanAccess]'
})
export class PermissionsDirective implements OnInit {
  // @HostBinding('style.display') display: Array<string>;
  // @Input('appCanAccess') role: Array<string> = ['SuperAdmin', 'Manager', 'Analyst'];
  @Input('appCanAccess') appCanAccess: string | string[];


  constructor(private el:ElementRef, private renderer: Renderer2, private _cs : ContainerService) { }

  ngOnInit(){
    // this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    console.log("From directive", this._cs.permissions)
  }
}
