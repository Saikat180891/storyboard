import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "stb-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input("btnStyle") btnStyle: string;
  @Input("btnName") btnName: string;
  @Input("btnColor") btnColor: string;
  @Input("htmlIcon") htmlIcon: string;

  btnNameWithIcon: string;
  constructor() {}

  ngOnInit() {
    this.btnNameWithIcon = `${this.htmlIcon} ${this.btnName}`
  }
}
