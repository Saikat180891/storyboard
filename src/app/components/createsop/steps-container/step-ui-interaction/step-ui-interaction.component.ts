import { Component } from "@angular/core";
import { StepBaseComponent } from "../step-base/step-base.component";

@Component({
  selector: "app-step-ui-interaction",
  templateUrl: "./step-ui-interaction.component.html",
  styleUrls: ["./step-ui-interaction.component.scss"],
})
export class StepUiInteractionComponent extends StepBaseComponent {
  stepType = "ui-interaction";

  data = {
    interaction_type: "",
    click_option: "",
    field: "",
    notes: "",
    exception_handling: "",
    screen: "",
  };
}
