import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { allRoles, Role } from "../models/enums";
import { InviteUser } from "../models/invite-user.model";

@Component({
  selector: "app-invite-user-field",
  templateUrl: "./invite-user-field.component.html",
  styleUrls: [
    "./invite-user-field.component.scss",
    "../edit-project-dialog/edit-project-dialog.component.scss",
  ],
})
export class InviteUserFieldComponent implements OnInit {
  // Used in template to determine whether or not to display
  // validation failed styling.
  // TODO: this is kind of a hack, but we need to refactor the
  // entire dialog if we want to do it a better way.
  public submitted: boolean = false;

  roles: Role[] = allRoles;

  inviteUserForm = new FormGroup({
    email: new FormControl(
      "",
      Validators.compose([Validators.email, Validators.required])
    ),
    role: new FormControl("", Validators.required),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl(""),
  });

  constructor() {}

  ngOnInit() {}

  getData(): InviteUser {
    return this.inviteUserForm.value;
  }

  setSubmitted(): void {
    this.submitted = true;
  }

  isValid(): boolean {
    return this.inviteUserForm.valid;
  }
}
