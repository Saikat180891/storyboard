import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Assignee } from "../../models/assignee.model";
import { Role } from "../../models/enums";

interface RoleChangedEvent {
  role: Role;
}

interface RemoveAssigneeEvent {
  assignee: Assignee;
}

@Component({
  selector: "app-assignee-card",
  templateUrl: "./assignee-card.component.html",
  styleUrls: ["./assignee-card.component.scss"],
})
export class AssigneeCardComponent {
  @Input("assignee") assignee: Assignee;
  @Input("invalid") invalid: boolean;
  @Input("changeRoleDisabled") changeRoleDisabled: boolean;
  @Input("canRemoveAssignees") canRemoveAssignees: boolean;

  @Output() roleChanged: EventEmitter<RoleChangedEvent> = new EventEmitter();
  @Output() removeAssignee: EventEmitter<
    RemoveAssigneeEvent
  > = new EventEmitter();

  roles: Role[] = [Role.SUPER_ADMIN, Role.MANAGER, Role.ANALYST];

  constructor() {}

  ngOnInit() {}

  onRoleChange(value: Role): void {
    this.roleChanged.emit({ role: value });
  }

  onRemove(): void {
    this.removeAssignee.emit({ assignee: this.assignee });
  }
}
