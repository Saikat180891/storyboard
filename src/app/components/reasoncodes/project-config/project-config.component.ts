import {
  AfterViewChecked,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { UtilsService } from "src/app/utils.service";
import { SharedServicesService } from "../../../services/shared-services/shared-services.service";
import { Sprint } from "../models/Sprint.model";
import { ReasonCodeService } from "../reason-code.service";
import { ApiService } from "../services/api.service";
import { ProjectConfigureService } from "../services/project-configure.service";

@Component({
  selector: "project-config",
  templateUrl: "./project-config.component.html",
  styleUrls: ["./project-config.component.scss"],
})
export class ProjectConfigComponent implements OnInit {
  @Output("closeSprints") closeSprints = new EventEmitter<boolean>();
  @Input("reasonCodeConfigData") previouslySavedEpics;

  sprintConfigData: Sprint[] = [];

  role: string;
  permissions: any;

  constructor(
    private reasoncodeService: ReasonCodeService,
    private spinner: NgxSpinnerService,
    private __sharedService: SharedServicesService,
    private __utils: UtilsService,
    private apiEnpointService: ApiService,
    private projectConfigureService: ProjectConfigureService
  ) {}

  @HostListener("document:keyup.escape", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.__sharedService.KEY_CODE.ESCAPE) {
      this.closeSprints.emit(false);
    }
  }

  ngOnInit() {
    this.getSprints();
  }

  getSprints() {
    this.apiEnpointService.getSprint(this.reasoncodeService.sopId).subscribe(
      (res: Sprint[]) => {
        this.projectConfigureService.setSprints(res);
      },
      err => {},
      () => {
        this.sprintConfigData = this.projectConfigureService.getSprints();
      }
    );
  }

  ngOnChanges() {
    this.role = this.reasoncodeService.role;
    this.permissions = this.reasoncodeService.grantedPermission;
  }

  onClose() {
    this.closeSprints.emit(false);
    this.reasoncodeService.refresh(this.reasoncodeService.sopId);
  }

  closeAll() {
    this.closeSprints.emit(false);
  }
}
