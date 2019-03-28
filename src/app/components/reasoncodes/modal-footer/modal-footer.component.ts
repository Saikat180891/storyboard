import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-modal-footer",
  templateUrl: "./modal-footer.component.html",
  styleUrls: ["./modal-footer.component.scss"],
})
export class ModalFooterComponent implements OnInit {
  @Output("selectedIndex") selectedIndex = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onbuttonClicked(index: number) {
    this.selectedIndex.emit(index);
  }
}

/**
 * [appCanAccess]="{role: role, permissionRequired: 'Can change sprint',
  permissionList: permissions}"
 */
