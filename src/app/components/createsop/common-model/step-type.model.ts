export enum StepType {
  READ = "read",
  TYPE = "type",
  CALCULATION = "calculation",
  UI_INTERACTION = "ui-interaction",
  CONDITION = "condition",
  START_LOOP = "start-loop",
  END_LOOP = "end-loop",
}

export interface Step {
  step_id?: number;
  type: string;
  data: Object;
  insertion_id?: number;
  screen_id?: number;
}
