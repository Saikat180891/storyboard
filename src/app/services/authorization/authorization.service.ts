import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  createPermissionAsPerUserRole(userRole:string){
    switch(userRole){
      case 'SuperAdmin':

      return {
        canAddAssignee: true,
        canAddSop: true,
        canChangeAssignee: true,
        canChangeSop: true,
        canDeleteAssignee: true,
        canDeleteSop: true,
        canViewAssignee: true,
        canViewSop: true
      };

      case 'Manager':

      return {
        canAddAssignee: true,
        canAddSop: false,
        canChangeAssignee: true,
        canChangeSop: false,
        canDeleteAssignee: true,
        canDeleteSop: false,
        canViewAssignee: true,
        canViewSop: true
      };

      case 'Analyst':

      return {
        canAddAssignee: false,
        canAddSop: false,
        canChangeAssignee: false,
        canChangeSop: false,
        canDeleteAssignee: false,
        canDeleteSop: false,
        canViewAssignee: true,
        canViewSop: true
      };

      default: 

      return {};
    }
  }
}
