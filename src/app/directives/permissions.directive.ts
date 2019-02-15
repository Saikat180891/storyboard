
/**
 * [appCanAccess]="{role:role<string>, permissionRequired:requiredPermission<string>, permissionList: permissionList<Object>}"
 * this is the authorization directive, directive can take 4 parameters role, permissionRequired, permissionList, action
 * the role attribute is currently redundant and is kept for future scope, the permissionRequired attribute takes a string
 * parameter ex: 'can edit sop' and compares it with the permission present in the permissionList if the result is false then
 * the directive will either stop rendering the component or will disable the component.
 * appCanAccess is the name of the directive
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
  @Input('appCanAccess') appCanAccess: any | Permission;

  constructor(
    private el:ElementRef, 
    private renderer: Renderer2, 
    private _cs : ContainerService,
    private __authorization: AuthorizationService
    ) { }

  ngOnInit(){
    //storing the list of permission received from the backend in a local variable
    let grantedPermissions = this.appCanAccess.permissionList;
    //check if action attribute has 'disable' as parameter or not
    if(this.appCanAccess.action == 'disable'){
      //check if the required permission is present in the permission list or not
      if(this.appCanAccess.permissionRequired in grantedPermissions){
        //if the granted permission value is false the proceed to the else block
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
  }
}
