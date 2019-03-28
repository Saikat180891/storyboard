import {
  changeHypenToBackSlashFormatOfDate,
  formatToUSDate,
} from "../../../utils.service";

export interface Sprint {
  currentSprintFlag?: boolean;
  duration: string;
  endDate: string;
  id?: number;
  sprintName: string;
  startDate: string;
}

export interface SprintBackend {
  duration: string;
  end_date: string;
  sprint_name: string;
  start_date: string;
}

export class SprintAdapter {
  private sprintName: string;
  private currentSprintFlag?: boolean;
  private duration: string;
  private endDate: string;
  private id?: number;
  private startDate: string;

  constructor(res: any) {
    this.sprintName = res.sprint_name;
    this.currentSprintFlag = res.current_sprint_flag;
    this.endDate = formatToUSDate(
      changeHypenToBackSlashFormatOfDate(res.end_date)
    );
    this.duration = res.duration;
    this.startDate = res.start_date;
    this.id = res.id;
  }
  getSprints() {
    return {
      sprintName: this.sprintName,
      startDate: this.startDate,
      duration: this.duration,
      endDate: this.endDate,
      id: this.id,
      currentSprintFlag: this.currentSprintFlag,
    };
  }
}
