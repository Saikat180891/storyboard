import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createsop',
  templateUrl: './createsop.component.html',
  styleUrls: ['./createsop.component.scss']
})
export class CreatesopComponent implements OnInit {

  constructor(private routes:ActivatedRoute) { }

  ngOnInit() {
    console.log(this.routes)
  }

}
