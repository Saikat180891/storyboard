import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Assignee } from "../../models/assignee.model";
import { allRoles, Role } from "../../models/enums";

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
  @Input("assignee") assignee: Assignee = {
    user: "",
    email: "",
    role: Role.ANALYST,
  };
  @Input("invalid") invalid: boolean = false;
  @Input("changeRoleDisabled") changeRoleDisabled: boolean = false;
  @Input("canRemoveAssignees") canRemoveAssignees: boolean = false;

  @Output() roleChanged: EventEmitter<RoleChangedEvent> = new EventEmitter();
  @Output() removeAssignee: EventEmitter<
    RemoveAssigneeEvent
  > = new EventEmitter();

  roles: Role[] = allRoles;

  constructor() {}

  ngOnInit() {}

  onRoleChange(value: Role): void {
    this.roleChanged.emit({ role: value });
  }

  onRemove(): void {
    this.removeAssignee.emit({ assignee: this.assignee });
  }
}
