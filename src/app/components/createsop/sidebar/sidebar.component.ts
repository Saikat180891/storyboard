import { HttpEventType, HttpResponse } from "@angular/common/http";
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { SharedService } from "../../../services/shared-services/shared.service";
import { PageService } from "../services/page/page.service";
import { SidebarService } from "../services/sidebar/sidebar.service";
import { UicontrolService } from "../services/uicontrol.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: [
    "./sidebar.component.scss",
    "./volume-slider-handle.scss",
    "../../reasoncodes/completed-warning.scss",
  ],
})
export class SidebarComponent implements OnInit {
  @Output("close") close = new EventEmitter<any>();
  @Output("exportSelectedImageToSop")
  exportSelectedImageToSop = new EventEmitter<any>();
  @ViewChild("videoPlayer") videoPlayer: ElementRef;
  @ViewChild("canvas") canvas: ElementRef;
  @ViewChild("volumeController") volumeController: ElementRef;
  protected ngUnsubscribe = new Subject<void>();

  isPlaying: boolean = false;
  isMuted: boolean = false;
  duration: any = "00:00";
  currentTime: any = "00:00";
  progress: number = 0;
  videos = [1, 2, 3, 4, 5, 6, 7, 8];
  currentImage: number = 0;
  playThisVideo: string = "";
  createdImage: any; // optional to test if image is created or not
  content: any;
  videoGalleryContent = [];
  imageGalleryContent = [];
  uploadProgress: boolean = false;
  uploadProgressPercentage: any;
  uploadProgressText: any;
  videoUpload: any;
  buffered: number;
  videoName: string;
  imageName: string;
  warningToDeleteVideo: boolean = false;
  deleteContent: any;

  constructor(
    private __uic: UicontrolService,
    private __sidebarService: SidebarService,
    private __page: PageService,
    private snackBar: MatSnackBar,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.videoPlayer.nativeElement.volume = 0.5;
    this.fetchAllVideosAlreadyUploaded();
    this.fetchAllSnapshotsAlreadyTaken();
    this.duration = "00:00";
    this.currentTime = "00:00";
  }

  /**
   * this function will get all the previously uploaded videos
   * and populate them in the 'videoGalleryContent' array list variable
   *
   */
  fetchAllVideosAlreadyUploaded() {
    this.__sidebarService
      .getAllUploadedVideo(`/sop/${this.__page.projectId}/video.json`)
      .subscribe(
        res => {
          this.videoGalleryContent = res;
          if (this.videoGalleryContent.length > 0) {
            this.playThisVideo = this.videoGalleryContent[0].video_url;
            this.__page.videoId = this.videoGalleryContent[0].id;
          }
        },
        err => {},
        () => {
          this.progress = this.videoPlayer.nativeElement.currentTime = 0;
        }
      );
  }

  /**
   * this function gets all the images previously uploaded and populate them
   * in the 'imageGalleryContent' present in the 'PageService' service, a
   * service is used so that the variable is sharable between other components
   */
  fetchAllSnapshotsAlreadyTaken() {
    this.__sidebarService
      .getAllThumbnails(`/sop/${this.__page.projectId}/image.json`)
      .subscribe((res: any) => {
        res.forEach(element => {
          element["thumbnail"] = element["image_url"];
        });
        this.__page.imageGalleryContent = this.imageGalleryContent = res;
      });
  }

  /**
   * this function is used to close the mediapane
   */
  onCloseSideBar() {
    this.close.emit({ type: "media", shouldOpen: false });
  }

  // for carousel
  /**
   * this function is use to change the image in the carousel
   * by using the left button
   */
  onCarouselMoveLeft() {
    if (this.currentImage < this.imageGalleryContent.length - 1) {
      this.currentImage = this.currentImage + 1;
    }
  }

  /**
   * this function is used to change the image in the carousel
   * by using the right button
   */
  onCarouselMoveRight() {
    if (this.currentImage > 0) {
      this.currentImage = this.currentImage - 1;
    }
  }

  /**
   * this function is called when a particular image is selected
   */
  onselectRequestedThumbnail($event: any) {
    this.currentImage = $event.index;
    this.imageName = $event.content.image_name;
  }

  // for video player
  /**
   * this function is used to play/pause the video
   */
  onPlayPause() {
    if (this.videoPlayer.nativeElement.paused) {
      this.videoPlayer.nativeElement.play();
      this.isPlaying = true;
    } else {
      this.videoPlayer.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  /**
   * this function is used to control the volume of the video
   * it also stores the last position in the localstorage so that when the user returns
   * to the app it can get the last volume value
   */
  onVolumeControl() {
    if (!this.isMuted) {
      this.videoPlayer.nativeElement.muted = true;
      this.isMuted = true;
      localStorage.setItem(
        "lastvol",
        this.volumeController.nativeElement.value
      );
      this.videoPlayer.nativeElement.volume = this.volumeController.nativeElement.value = 0;
    } else {
      this.videoPlayer.nativeElement.muted = false;
      this.isMuted = false;
      this.videoPlayer.nativeElement.volume =
        Number(localStorage.getItem("lastvol")) / 100;
      this.volumeController.nativeElement.value = localStorage.getItem(
        "lastvol"
      );
    }
  }

  /**
   * this function is used to mute the audio
   */
  onDragVolumeHandle(value) {
    this.videoPlayer.nativeElement.volume = value / 100;
    if (value == 0) {
      this.isMuted = true;
    } else {
      this.isMuted = false;
    }
  }

  /**
   * this function will fast forward the video by 10 secs
   */
  onFastForward() {
    if (
      this.videoPlayer.nativeElement.currentTime <
      this.videoPlayer.nativeElement.duration
    ) {
      this.videoPlayer.nativeElement.currentTime =
        this.videoPlayer.nativeElement.currentTime + 10;
    }
  }

  /**
   * this function will rewind the video by 10secs
   */
  onRewind() {
    if (this.videoPlayer.nativeElement.currentTime > 10) {
      this.videoPlayer.nativeElement.currentTime =
        this.videoPlayer.nativeElement.currentTime - 10;
    }
  }

  /**
   * this function is used to take snapshot of the video
   * the video be will pause while taking snapshot, to play the
   * video press the play button, the funtion will also store the
   * frame of the video in a canvas element and will convert it to
   * file, an option to download the image file is also present but
   * is removed in the html template
   */
  onTakeSnapshot() {
    this.videoPlayer.nativeElement.pause();
    this.isPlaying = false;

    function dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }

    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext("2d");

    const imageWidth = this.videoPlayer.nativeElement.videoWidth;
    const imageHeight = this.videoPlayer.nativeElement.videoHeight;
    this.canvas.nativeElement.height = imageHeight;
    this.canvas.nativeElement.width = imageWidth;

    ctx.drawImage(
      this.videoPlayer.nativeElement,
      0,
      0,
      imageWidth,
      imageHeight
    );
    let imageData: any, file: any;
    const img = new Image(imageWidth, imageHeight);
    try {
      imageData = canvas.toDataURL("image/jpeg");
      img.crossOrigin = "anonymous";
      img.src = imageData;
    } catch (err) {
    } finally {
      file = dataURLtoFile(imageData, "image.jpeg");
      const snapshotData = new FormData();
      snapshotData.append("image", file);
      const apiEndpoint = `/sop/${this.__page.projectId}/image.json?video_id=${
        this.__page.videoId
      }`;
      this.__sidebarService.sendSnapshot(apiEndpoint, snapshotData).subscribe(
        res => {
          this.snackBar.open("Snapshot taken successfully", "Success", {
            duration: 3000,
          });
        },
        err => {
          this.snackBar.open(
            "An error occured while saving snapshot",
            "Failed",
            { duration: 3000 }
          );
        },
        () => {}
      );

      /**
       * the createdImage contains the image of the snapshot taken and is kept for future use
       * this variable will be used with an anchor tag in the html template with download as a
       * property or attribute so that the user the download the file if required
       */
      this.createdImage = imageData;
    }
  }

  /**
   * this funtion is called when the user switches to another video
   */
  onSelectedVideo($event: any) {
    this.videoPlayer.nativeElement.pause();
    this.isPlaying = false;
    this.playThisVideo = $event.content.video_url;
    this.videoName = $event.content.video_name;
    this.__page.videoId = $event.content.id;
    this.progress = this.videoPlayer.nativeElement.currentTime = 0;
    this.duration = this.convertSecondsToMinutes(0);
    this.currentTime = this.convertSecondsToMinutes(0);
    this.onPlayPause();
  }

  /**
   * this function is called when the timeupdate event is triggered
   * the function will take the currentTime of the video and it will convert
   * top standard form to display in the UI HH:MM:SS
   */
  onTimeUpdate($event) {
    if (isNaN(this.videoPlayer.nativeElement.duration)) {
      this.duration = this.convertSecondsToMinutes(0);
    } else {
      this.duration = this.convertSecondsToMinutes(
        this.videoPlayer.nativeElement.duration
      );
    }
    this.currentTime = this.convertSecondsToMinutes(
      this.videoPlayer.nativeElement.currentTime
    );
    this.progress =
      (this.videoPlayer.nativeElement.currentTime /
        this.videoPlayer.nativeElement.duration) *
      100;
    if (
      this.videoPlayer.nativeElement.currentTime ==
      this.videoPlayer.nativeElement.duration
    ) {
      this.videoPlayer.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  /**
   * this function is used to upload image when a user uploads an image
   * from the desktop and then it fetches all the previously stored images
   */
  onImageUpload(file) {
    const apiEndpoint = `/sop/${this.__page.projectId}/image.json`;
    const formData = new FormData();
    formData.append("image", file);
    this.__sidebarService.uploadImage(apiEndpoint, formData).subscribe(res => {
      this.fetchAllSnapshotsAlreadyTaken();
    });
  }

  /**
   * this function is used to convert seconds into HH:MM:SS
   * @param secs time in seconds
   */
  convertSecondsToMinutes(time: number) {
    const toHHMMSS = secs => {
      const sec_num = parseInt(secs, 10);
      const hours = Math.floor(sec_num / 3600) % 24;
      const minutes = Math.floor(sec_num / 60) % 60;
      const seconds = sec_num % 60;
      return [hours, minutes, seconds]
        .map(v => (v < 10 ? "0" + v : v))
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
    };

    return toHHMMSS(time);
  }

  onChangeCurrentTime($event) {
    const actualTime = ($event / 100) * this.videoPlayer.nativeElement.duration;
    const bufferedStart = this.videoPlayer.nativeElement.buffered.start(0);
    this.videoPlayer.nativeElement.currentTime = actualTime;
  }

  /**
   * this funtion is used to get all the images when the user clicks
   * on the images tab
   */
  onTabChange(value: number) {
    if (value == 1) {
      this.fetchAllSnapshotsAlreadyTaken();
    }
  }

  /**
   * this function is used to upload video from the desktop
   * it also shows the percentage of video being uploaded in
   * real time
   */
  onVideoUpload($event) {
    const apiEndpoint = `/sop/${this.__page.projectId}/video.json`;
    const videoData = new FormData();
    videoData.append("video", $event);
    this.videoUpload = this.__sidebarService
      .sendVideo(apiEndpoint, videoData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            // This is an upload progress event. Compute and show the % done:
            this.uploadProgress = true;
            const percentDone = Math.round((100 * event.loaded) / event.total);
            this.uploadProgressPercentage = percentDone;
            this.uploadProgressText = `File is ${percentDone}% uploaded.`;
          } else if (event instanceof HttpResponse) {
            this.uploadProgressText = "File is completely uploaded!";
          }
        },
        err => {
          this.sharedService.raiseError(err.message);
          this.uploadProgress = false;
        },
        () => {
          this.fetchAllVideosAlreadyUploaded();
          this.uploadProgress = false;
        }
      );
  }

  /**
   * This Function will show the warning Box
   */
  onDeleteVideo($event) {
    this.warningToDeleteVideo = true;
    this.deleteContent = $event;
  }

  onSelectDeleteVideo() {
    const apiEndpoint = `/sop/video/${this.deleteContent.content.id}.json`;
    this.__sidebarService.deleteContent(apiEndpoint).subscribe(
      res => {
        this.videoGalleryContent.splice(this.deleteContent.index, 1);
      },
      err => {},
      () => {
        if (
          this.deleteContent.index - 1 != -1 &&
          this.deleteContent.index != this.videoGalleryContent.length - 1
        ) {
          this.playThisVideo = this.videoGalleryContent[
            this.deleteContent.index - 1
          ].video_url;
        }
      }
    );
    this.warningToDeleteVideo = false;
  }

  onSelectDoNotDeleteVideo() {
    this.warningToDeleteVideo = false;
  }

  /**
   * this function is called when the user clicks on cancel button
   * which appears while any video is being uploaded
   */
  onCancelVideoUpload() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * this function is used to delete an image from the gallery
   */
  onDeleteImage($event) {
    const apiEndpoint = `/sop/image/${$event.content.id}.json`;
    this.__sidebarService.deleteContent(apiEndpoint).subscribe(
      res => {
        if (
          this.currentImage > 0 &&
          this.currentImage < this.__page.imageGalleryContent.length - 1
        ) {
          this.currentImage = this.currentImage - 1;
        }
        this.snackBar.open("Snapshot deleted successfully", "Success", {
          duration: 3000,
        });
      },
      err => {
        this.snackBar.open("Failed to delete the selected snapshot", "Failed", {
          duration: 3000,
        });
      },
      () => {
        this.fetchAllSnapshotsAlreadyTaken();
      }
    );
  }

  onExportToSop() {
    this.exportSelectedImageToSop.emit({
      content: this.imageGalleryContent[this.currentImage],
    });
    this.__page.shouldShowExportToSopModal = true;
  }
}
