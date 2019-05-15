import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { MatSlideToggleChange } from "@angular/material";
import { ServerUserstory } from "../models/Userstory.model";
import { ReasonCodeService } from "../reason-code.service";

@Component({
  selector: "app-userstory-card",
  templateUrl: "./userstory-card.component.html",
  styleUrls: ["./userstory-card.component.scss"],
})
export class UserstoryCardComponent implements OnInit, OnChanges {
  @Input("userStory") inputUserStory: any = {
    notes: "",
    us_name: "",
  };
  @Input("restore") restore: boolean;
  @Input("disableDeleteBtn") disableDeleteBtn: boolean;
  @Input("disableEdit") disableEdit: boolean = false;

  @Output("editUserStory") editUserStory = new EventEmitter();
  @Output("userstoryEditted") userstoryEditted = new EventEmitter();
  @Output("deleteUserStory") deleteUserStory = new EventEmitter();

  userStory: ServerUserstory;
  rippleColor = "rbga(0,0,0,0.2)";
  permissions: any = {};
  role: string;
  selected: number = -1;

  constructor(private reasonCodeService: ReasonCodeService) {}

  ngOnInit() {
    this.userStory = { ...this.inputUserStory };
  }

  ngOnChanges() {
    this.permissions = this.reasonCodeService.grantedPermission;
    this.role = this.reasonCodeService.role;
  }

  onEdit() {
    this.editUserStory.emit(true);
    this.selected = this.inputUserStory.id;
  }

  checkIfPermissiongranted(requiredPermission: string) {
    if (requiredPermission in this.permissions) {
      return !this.permissions[requiredPermission] || this.disableEdit;
    }
    return true || this.disableEdit;
  }

  toggleRules(event: MatSlideToggleChange) {
    this.userStory.rules_approved = event.checked;
    this.userstoryEditted.emit(this.userStory);
  }

  toggleTVC(event: MatSlideToggleChange) {
    this.userStory.verified_test_cases = event.checked;
    this.userstoryEditted.emit(this.userStory);
  }

  onDelete(id: number): void {
    this.deleteUserStory.emit(id);
  }

  restoreUserStories(id: number): void {
    this.reasonCodeService.restoreUserStories(id);
  }

  display(value: any): any {
    switch (value) {
      case null:
        return "Unassigned";
      case 0:
        return "-----";
      default:
        return value;
    }
  }
}
