export interface StepData {
  screen?: string;
}

export interface ReadStepData extends StepData {
  field: string;
  value: string;
  notes: string;
  exception_handling: string;
  data_type: string;
  data_value_constraint: string;
}

export interface TypeStepData extends StepData {
  field: string;
  value: string;
  notes: string;
  exception_handling: string;
}

export interface UiInteractionStepData extends StepData {
  field: string;
  notes: string;
  exception_handling: string;
  interaction_type: string;
  click_option: string;
}

export interface CalculationStepData extends StepData {
  calc_value: string;
}

export interface LoopStepData extends StepData {
  loop_parameters: string;
}

export enum StepConditionType {
  MINOR = "Minor",
  MAJOR = "Major",
}

export interface ConditionBlock {
  condition?: string;
  operator?: string;
  criteria?: string;
  logical_condition?: string;
}

export interface ConditionStepData extends StepData {
  condition_selected: StepConditionType;
  condition: string;
  operator: string;
  criteria: string;
  condition_blocks: ConditionBlock[];
  next_no_of_steps: string;
  notes: string;
}

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
