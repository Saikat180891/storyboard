import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "stb-modal-header",
  templateUrl: "./modal-header.component.html",
  styleUrls: ["./modal-header.component.scss"],
})
export class ModalHeaderComponent implements OnInit {
  @Input("modalName") modalName: string;
  @Output("close") close = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  onClose(): void {
    this.close.emit(true);
  }
}
