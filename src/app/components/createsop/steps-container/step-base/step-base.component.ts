import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { FileAttachmentService } from "../../../shared/file-attachment/file-attachment.service";
import { StepData } from "../../common-model/step-type.model";
import { ExportToSopService } from "../../services/export-to-sop/export-to-sop.service";
import { StepcontrolService } from "../../services/stepcontrol/stepcontrol.service";

interface AttachmentDownloadEvent {
  url: string;
  fileName: string;
}
interface StepEditEvent {
  data: StepData;
  sectionIndex: number;
  stepIndex: number;
  stepType: string;
  sectionId: number;
  stepId: number;
  mode: string;
  attachmentDelete: boolean;
}

@Component({
  selector: "app-step-base",
  template: "",
})
export class StepBaseComponent implements OnInit {
  @Input("sectionId") sectionId: number;
  @Input("stepIndex") stepIndex: number;
  @Input("stepData") stepData: any = {};
  @Input("sectionIndex") sectionIndex: number;
  @Output("deleteStep") deleteStep = new EventEmitter();
  @Output("outputChange") outputChange = new EventEmitter();
  @Output("attachmentDownload") attachmentDownload: EventEmitter<
    AttachmentDownloadEvent
  > = new EventEmitter<AttachmentDownloadEvent>();
  @Output("attachmentDelete") attachmentDelete: EventEmitter<
    StepEditEvent
  > = new EventEmitter<StepEditEvent>();

  stepType: string = "base";
  canEdit: boolean = false;
  screenList = [];
  data: StepData = {};
  conditions = ["Minor", "Major"];

  constructor(
    private exportService: ExportToSopService,
    private fileAttachmentService: FileAttachmentService,
    private stepControlService: StepcontrolService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    if (this.stepData.step_id || this.stepData.id) {
      this.setExistingStepState();
    } else {
      this.setNewStepState();
    }
    this.exportService.getScreensAsObservable().subscribe(screen => {
      this.screenList = screen;
    });
  }

  setNewStepState() {
    this.canEdit = true;
  }

  setExistingStepState() {
    this.data = {
      ...this.stepData.data,
    };
    this.canEdit = false;
  }

  onClikedOnEdit() {
    this.stepControlService.setShouldChildrenBeSaved(true);
    this.canEdit = !this.canEdit;
    this.stepControlService.setStepEditMode(true);
  }

  onClickOnOk() {
    if (this.stepData.step_id) {
      this.outputChange.emit({
        data: this.data,
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        stepType: this.stepType,
        sectionId: this.sectionId,
        stepId: this.stepData.step_id,
        mode: "edit",
      });
    } else {
      this.outputChange.emit({
        data: this.data,
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        stepType: this.stepType,
        sectionId: this.sectionId,
        mode: "create",
      });
    }
    this.stepControlService.getStepEditMode().subscribe(res => {
      if (!res) {
        this.canEdit = false;
      }
    });
  }

  onCancelEdit() {
    this.canEdit = false;
    this.data = {
      ...this.stepData.data,
    };

    if (!(this.stepData.step_id || this.stepData.id)) {
      this.deleteStep.emit({
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        mode: "local",
      });
    }
  }

  getStepNumber() {
    return `${this.sectionIndex + 1}.${this.stepIndex + 1}`;
  }

  onDeleteStep() {
    if (this.stepData.step_id || this.stepData.id) {
      this.deleteStep.emit({
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        stepId: this.stepData.step_id
          ? this.stepData.step_id
          : this.stepData.id,
        insertionId: this.stepData.insertion_id,
        mode: "server",
      });
    } else {
      this.deleteStep.emit({
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        mode: "local",
      });
    }
  }

  onAttachIconClick($event) {
    this.fileAttachmentService
      .openFileAttachmentDialog(`Attach file to step - ${this.getStepNumber()}`)
      .subscribe((res: File) => {
        if (res) {
          if (this.stepData.step_id) {
            this.outputChange.emit({
              data: this.data,
              sectionIndex: this.sectionIndex,
              stepIndex: this.stepIndex,
              stepType: this.stepType,
              sectionId: this.sectionId,
              stepId: this.stepData.step_id,
              mode: "edit",
              attachment: res,
            });
          }
        }
      });
  }

  onAttachmentDownload() {
    this.attachmentDownload.emit({
      url: this.stepData.attachment_url,
      fileName: this.stepData.attachment_name,
    });
  }

  onAttachmentDelete() {
    const event = {
      data: this.data,
      sectionIndex: this.sectionIndex,
      stepIndex: this.stepIndex,
      stepType: this.stepType,
      sectionId: this.sectionId,
      stepId: this.stepData.step_id,
      mode: "edit",
      attachmentDelete: true,
    };
    this.attachmentDelete.emit(event);
  }
}
