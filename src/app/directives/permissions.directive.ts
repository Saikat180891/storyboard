
/**
 * [appCanAccess]="{role:role<string>, permissionRequired:requiredPermission<string>, permissionList: permissionList<Object>}"
 */

import { Directive, ElementRef, OnInit, Renderer2, HostBinding, Input,  } from '@angular/core';
import {ContainerService} from '../components/projects/container/container.service'
import {AuthorizationService} from '../services/authorization/authorization.service';

interface Permission{
  role?:string;
  permissionRequired?:string;
  permissionList?:Object;
  action?:string;
}

@Directive({
  selector: '[appCanAccess]'
})
export class PermissionsDirective implements OnInit {
  // @HostBinding('style.display') display: Array<string>;
  // @Input('appCanAccess') role: Array<string> = ['SuperAdmin', 'Manager', 'Analyst'];
  @Input('appCanAccess') appCanAccess: any | Permission;

  constructor(
    private el:ElementRef, 
    private renderer: Renderer2, 
    private _cs : ContainerService,
    private __authorization: AuthorizationService
    ) { }

  ngOnInit(){

    // console.log("From directive", Object.entries(this.appCanAccess).length === 0 && this.appCanAccess.constructor === Object);
    // console.log("From directive", this.appCanAccess);
    // if(this.appCanAccess){
  
      let grantedPermissions = this.appCanAccess.permissionList;
      if(this.appCanAccess.action == 'disable'){
        if(this.appCanAccess.permissionRequired in grantedPermissions){
          if(!grantedPermissions[this.appCanAccess.permissionRequired]){
            if(this.el.nativeElement.nodeName == 'BUTTON'){
              this.renderer.setProperty(this.el.nativeElement, 'disabled', 'true');
              this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
            }else{
              this.renderer.setAttribute(this.el.nativeElement, 'readonly', 'true');
            }
          }
        }
      }else{
        if(this.appCanAccess.permissionRequired in grantedPermissions){
          if(!grantedPermissions[this.appCanAccess.permissionRequired]){
            this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
          }
        }
      }

    // }

  }
}
