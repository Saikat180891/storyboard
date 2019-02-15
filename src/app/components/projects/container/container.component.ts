import { Component, OnInit, OnChanges, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { DataService } from '../../../data.service';
import { AppcontrolService } from '../../../services/controlservice/appcontrol.service';
import {ContainerService} from './container.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {AuthorizationService} from '../../../services/authorization/authorization.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss', '../../reasoncodes/completed-warning.scss'],
})

export class ContainerComponent implements OnInit, AfterViewChecked {
  userPermissions = [];
  openCreateProjectDialogBox:boolean = false;
  openEditProjectDialogBox:boolean = false;
  permissionsGrantedForBackdrop:any;
  warningToDeleteSop:boolean = false;
  sopIdToDelete:number;
  projectData:any;
  
  constructor(
    private _dataService: DataService, 
    private __uic: AppcontrolService,
    private _ContainerService: ContainerService,
    private __spinner: NgxSpinnerService,
    private __authorization: AuthorizationService) {  }



  ngOnInit() {
    /**
     * Fetch data to load the cards
     */
    this.getListOfAllProjects();
  }
  
  ngAfterViewChecked(){
  }
  /**
   * fetch all projects and permission and combine both of them
   */
  getListOfAllProjects(){
    this.__spinner.show();
    let projectlist:any = [];
    let permissions = [];
    // make an api call to fetch the project list
    this._ContainerService.getListOfAllProjects().subscribe(res=>{
      // rearrange the project list as required for the frontend
      res.forEach((element)=>{
        projectlist.push({
          themeColor: this.__uic.colorPicker[this._ContainerService.getUniqueNumber()],
          reasonCodes: this.__uic.firstZero(Number(element["number_epics"])),
          ...element,
          logo: element["logo_url"]
        });
      });
    },
    (err)=>{
      this.__spinner.hide();
    },
    ()=>{
      // once the above call the completed make another call to get the permissions dictionary
      this._dataService.getPermission(1).subscribe(res=>{
        //rearrange as required for the frontend
        res.forEach(ele=>{
          permissions.push({
              projectId : ele["proj_id"],
              role : ele["name"],
              permissions: ele["permissions"]
            });
        });
      },
      (err)=>{
        this.__spinner.hide();
      },
      ()=>{
        // combine the list of projects and the list of permission with respect to their respective ids
        projectlist.forEach((project, projectIndex)=>{
          permissions.forEach((projectPermission, permissionIndex)=>{
            if(project.id == projectPermission.projectId){
              project["currentUserPermission"] = projectPermission["permissions"];
              project["permissionsGranted"] = this.__authorization.createPermissionAsPerUserRole(projectPermission["role"]);
            }
          });
        });
        this._ContainerService.cardContents = projectlist;
        this.__spinner.hide();
      });
    });
  }

  onEditProject($event:any, index:number){
    this.projectData = $event.data;
    this.openEditProjectDialogBox = $event.status;
  }


  onDeleteSop($event){
    this.warningToDeleteSop = $event.status;
    this.sopIdToDelete = $event.id;
  }

  onSelectDoNotDeleteSop(){
    this.warningToDeleteSop = false;
  }
  /**
   * Delete project
   */
  onSelectDeleteSop(){
    this._dataService.delete('/sop',this.sopIdToDelete + '.json')
      .subscribe(response => {
        this._ContainerService.cardContents.forEach((element, index)=>{
          if(element.id == this.sopIdToDelete){
            this._ContainerService.cardContents.splice(index, 1);
            this.warningToDeleteSop = false;
          }
        })
    });
  }

  givenPermissions(permissions){
    this.permissionsGrantedForBackdrop = permissions;
  }
  
  onCreateProject($event){
    this.openCreateProjectDialogBox = true;
  }
}
