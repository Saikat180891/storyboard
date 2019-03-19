import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { ScrollbarService } from "../services/scrollbarService/scrollbar.service";
import { fromEvent } from "rxjs";
import {
  Router,
  NavigationStart,
  NavigationCancel,
  NavigationEnd,
} from "@angular/router";
import { HeaderService } from "../components/header/header.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild("routerElement") routerElement: ElementRef;
  constructor(
    private __scrollbar: ScrollbarService,
    private router: Router,
    private _header: HeaderService
  ) {}

  ngOnInit() {
    /**
     * the from event is an operator from rxjs module which is used to check for any kind of event,
     * here it is used to check for scroll event in the #routerElement tag, when any scroll event
     * occurs the scrollTop value of the target element is set in the ScrollbarService using the
     * setScrollPosition() method, this value is later checked in the reasoncode component to display
     * a fixed navigation bar
     *
     */
    fromEvent(this.routerElement.nativeElement, "scroll").subscribe(
      (res: any) => {
        this.__scrollbar.setScrollPosition(res.target.scrollTop);
      }
    );
  }

  ngAfterViewInit() {
    /**
     * this function is fired when a new module is lazy-loaded, while the navigation process starts
     * the loading variable in the header service is made true which in turns displays the mat-progress-bar
     * once the navigation process ends the loading variable is made false to stop displaying the mat-progress-bar
     */
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this._header.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this._header.loading = false;
      }
    });
  }
}
