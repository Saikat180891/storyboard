import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";
import { RightPanelService } from "../../components/createsop/services/right-panel/right-panel.service";
import { StepLinkServiceService } from "./step-link-service.service";
@Directive({
  selector: "[StepDist]",
})
export class StepDistDirective implements OnInit {
  @Output("changeScreen") changeScreen = new EventEmitter<any>();
  @Input("StepDist") StepDist: any;
  private oldScrollvalue: number = -1;

  constructor(
    private el: ElementRef,
    private __rpService: RightPanelService,
    private __stepLink: StepLinkServiceService
  ) {}

  ngOnInit() {
    this.checkIfStepIsVisibleInViewport();
  }

  checkIfStepIsVisibleInViewport() {
    this.__rpService.getScrollPosition().subscribe(res => {
      const clientReactBounds = this.el.nativeElement.getBoundingClientRect();
      if (
        clientReactBounds.top >= 0 &&
        clientReactBounds.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) / 2
      ) {
        this.__stepLink.addStepsInViewPort(
          this.StepDist.step_id,
          this.StepDist.screen_id
        );
        this.__rpService.setHighlighter(
          this.__stepLink.getFirstStepId(this.checkScrollDirection(res))
        );
      } else {
        this.__stepLink.removeStepsNotInViewport(this.StepDist.step_id);
      }
    });
  }

  checkScrollDirection(scrollValue: number) {
    if (scrollValue > this.oldScrollvalue) {
      this.oldScrollvalue = scrollValue;
      return "down";
    }
    this.oldScrollvalue = scrollValue;
    return "up";
  }
}
