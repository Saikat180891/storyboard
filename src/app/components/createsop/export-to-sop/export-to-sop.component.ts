import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from '../../../data.service';
import { PageService } from '../services/page/page.service';
import { ExportToSopService } from '../services/export-to-sop/export-to-sop.service';
@Component({
  selector: 'app-export-to-sop',
  templateUrl: './export-to-sop.component.html',
  styleUrls: ['./export-to-sop.component.scss']
})
export class ExportToSopComponent implements OnInit {
  // data is an input to this component
  @Input('data') data: any;
  // close event is called when during modal close
  @Output('close') close = new EventEmitter<boolean>();
  // outputChange event is currently not in used but can is kept for
  // future requirements it will be triggered to output data from the component
  @Output('outputChange') outputChange = new EventEmitter<any>();
  // this variables are used for the user inputs
  applicationName: string;
  screenName: string;
  tabName: string;

  validateApplicationName: boolean = false;
  validateScreenName: boolean = false;
  validateTabName: boolean = false;

  /**
   *  required services are imported
   *  the 'DataService' class(service) is used to access AJAX functions
   *  the 'PageService' class(service) is used to access the 'projectId' variable required for the endpoint
   *  the 'ExportToSopService' class(service) is used to manage the state of the screens in the frontend
   */
  constructor(private __api: DataService, private __page: PageService, private __export: ExportToSopService) { }

  ngOnInit() {
  }

  /**
   * to close the modal window
   */
  onCloseExportModal() {
    this.close.emit(false);
  }

  validateForm() {
    let validationStatus = true;
    if (this.applicationName === '') {
      this.validateApplicationName = true;
      validationStatus = false;
    } else {
      this.validateApplicationName = false;
      validationStatus = true;
    }
    if (this.screenName === '') {
      this.validateScreenName = true;
      validationStatus = false;
    } else {
      this.validateScreenName = false;
      validationStatus = true;
    }
    if (this.tabName === '') {
      this.validateTabName = true;
      validationStatus = false;
    } else {
      this.validateTabName = false;
      validationStatus = true;
    }
    return validationStatus;
  }

  /**
   * this function is called when the user clicks on the 'Export to SOP' button
   */
  onExportToSop() {
    if (this.validateForm()) {
      // the id of the image is fetched from the input payload
      const { id } = this.data;
      // the required payload for the api is created
      const payload = {
        image_id: id,
        application_name: this.applicationName,
        screen_name: this.screenName,
        tab_name: this.tabName
      };
      // the call is executed at the below endpoint
      const endpoint = `/sop/${this.__page.projectId}/epics/userstories/sections/screens.json`;
      this.__api.post(endpoint, payload).subscribe(res => {
        // response is pushed to the 'screenlist' array in the 'ExportToSopService'
        this.__export.appendScreen(res);
      });
    } else {

    }
  }
}
