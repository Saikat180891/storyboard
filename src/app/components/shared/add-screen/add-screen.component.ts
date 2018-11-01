import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-screen',
  templateUrl: './add-screen.component.html',
  styleUrls: ['./add-screen.component.scss']
})
export class AddScreenComponent implements OnInit {
  @Input() headerPayload;

  constructor() { }

  ngOnInit() {
  }

}
