import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../data.service';
import { PageService } from '../services/page/page.service';
import { ExportToSopService } from '../services/export-to-sop/export-to-sop.service';
interface Snapshot {
  id: number;
  thumbnail: string;
}
@Component({
  selector: 'app-export-to-sop',
  templateUrl: './export-to-sop.component.html',
  styleUrls: ['./export-to-sop.component.scss']
})
export class ExportToSopComponent implements OnInit {
  // data is an input to this component
  @Input('data') data: Snapshot;
  // close event is called when during modal close
  @Output('close') close = new EventEmitter<boolean>();
  // create component from its parent component
  @Input('isComponentActive') isComponentActive: boolean;
  // outputChange event is currently not in used but can is kept for
  // future requirements it will be triggered to output data from the component
  @Output('outputChange') outputChange = new EventEmitter<any>();

  exportToSop = new FormGroup({
    application_name: new FormControl('', Validators.required),
    screen_name: new FormControl('', Validators.required),
    tab_name: new FormControl('', Validators.required),
  });

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
    this.isComponentActive = false;
  }

  /**
   * this function is called when the user clicks on the 'Export to SOP' button
   */
  onExportToSop() {
    // the id of the image is fetched from the input payload
    const { id } = this.data;
    // the required payload for the api is created
    const payload = {
      image_id: id,
      ...this.exportToSop.value
    };
    // the call is executed at the below endpoint
    const endpoint = `/sop/${this.__page.projectId}/epics/userstories/sections/screens.json`;
    this.__api.post(endpoint, payload).subscribe(res => {
      // response is pushed to the 'screenlist' array in the 'ExportToSopService'
      this.__export.appendScreen(res);
    }, err => {
      this.onCloseExportModal();
    },
    () => {
      this.onCloseExportModal();
    });
  }
}
