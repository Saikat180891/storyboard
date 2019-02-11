import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import {UicontrolService} from '../services/uicontrol.service';
import {SidebarService} from '../services/sidebar/sidebar.service';
import {PageService} from '../services/page/page.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', './volume-slider-handle.scss']
})
export class SidebarComponent implements OnInit {
  @Output('close') close = new EventEmitter<any>();
  @ViewChild('videoPlayer') videoPlayer:ElementRef;
  @ViewChild('canvas') canvas:ElementRef;
  @ViewChild('volumeController') volumeController:ElementRef;
  protected ngUnsubscribe = new Subject<void>();

  isPlaying:boolean = false;
  isMuted:boolean = false;
  duration:any = "00:00";
  currentTime:any = "00:00";
  progress:number = 0;
  videos = [1, 2, 3, 4, 5, 6, 7, 8];
  currentImage:number = 0;
  playThisVideo:string = '';
  createdImage:any; //optional to test if image is created or not
  content:any;
  videoGalleryContent = [];
  imageGalleryContent = [];
  uploadProgress:boolean = false;
  uploadProgressPercentage:any;
  uploadProgressText:any;
  videoUpload:any;
  buffered:number;
  videoName:string;

  constructor(
    private __uic:UicontrolService, 
    private __sidebarService:SidebarService, 
    private __page:PageService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.videoPlayer.nativeElement.volume = 0.5;
    this.fetchAllVideosAlreadyUploaded();
    this.fetchAllSnapshotsAlreadyTaken();
    this.duration = '00:00';
    this.currentTime = '00:00';
  }
  

  fetchAllVideosAlreadyUploaded(){
    this.__sidebarService.getAllUploadedVideo(`/sop/${this.__page.projectId}/video.json`).subscribe(res=>{
      this.videoGalleryContent = res;
      this.playThisVideo = this.videoGalleryContent[0].video_url;
      this.__page.videoId = this.videoGalleryContent[0].id;
      // console.log(res);
    },
    err=>{
      console.log("Error occured while fetching videos", err);
    },
    ()=>{this.progress = this.videoPlayer.nativeElement.currentTime = 0;}
    );
  }

  fetchAllSnapshotsAlreadyTaken(){
    this.__sidebarService.getAllThumbnails(`/sop/${this.__page.projectId}/image.json`).subscribe((res:any)=>{
      res.forEach(element => {
        element['thumbnail'] = element['image_url'];
      });
      this.__page.imageGalleryContent = this.imageGalleryContent = res;
      // console.log(res);
    });
  }

  onCloseSideBar(){
    this.close.emit({type:'media', shouldOpen: false});
  }

  //for carousel
  onCarouselMoveLeft(){
    if(this.currentImage < this.imageGalleryContent.length - 1){
      this.currentImage = this.currentImage + 1;
    }
  }

  onCarouselMoveRight(){
    if(this.currentImage > 0){
      this.currentImage = this.currentImage - 1;
    }
  }

  onselectRequestedThumbnail($event:any){
    this.currentImage = $event.index;
  }

  //for video player
  onPlayPause(){
    if(this.videoPlayer.nativeElement.paused){
      this.videoPlayer.nativeElement.play();
      this.isPlaying = true;
    }else{
      this.videoPlayer.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  onVolumeControl(){
    if(!this.isMuted){
      this.videoPlayer.nativeElement.muted = true;
      this.isMuted = true;
      localStorage.setItem('lastvol', this.volumeController.nativeElement.value);
      this.videoPlayer.nativeElement.volume = this.volumeController.nativeElement.value = 0;
    }else{
      this.videoPlayer.nativeElement.muted = false;
      this.isMuted = false;
      this.videoPlayer.nativeElement.volume = Number(localStorage.getItem('lastvol')) / 100;
      this.volumeController.nativeElement.value = localStorage.getItem('lastvol');
    }
  }

  onDragVolumeHandle(value){
    this.videoPlayer.nativeElement.volume = (value / 100);
    if(value == 0){
      this.isMuted = true;
    }else{
      this.isMuted = false;
    }
  }

  onFastForward(){
    if(this.videoPlayer.nativeElement.currentTime < this.videoPlayer.nativeElement.duration){
      this.videoPlayer.nativeElement.currentTime = this.videoPlayer.nativeElement.currentTime + 10;
    }
  }

  onRewind(){
    if(this.videoPlayer.nativeElement.currentTime > 10){
      this.videoPlayer.nativeElement.currentTime = this.videoPlayer.nativeElement.currentTime - 10;
    }
  }

  onTakeSnapshot(){
    this.videoPlayer.nativeElement.pause();
    this.isPlaying = false;

    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    }

    let canvas = this.canvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let imageWidth = this.videoPlayer.nativeElement.videoWidth;
    let imageHeight = this.videoPlayer.nativeElement.videoHeight;
    this.canvas.nativeElement.height = imageHeight;
    this.canvas.nativeElement.width = imageWidth;

    ctx.drawImage(this.videoPlayer.nativeElement, 0, 0, imageWidth, imageHeight);
    let imageData:any, file:any;
    let img = new Image(imageWidth, imageHeight);
    try{
      imageData = canvas.toDataURL('image/jpeg');
      img.crossOrigin="anonymous"
      img.src = imageData;
    }catch(err){
      console.log("Error while taking snapshot", err);
    }finally{
      file = dataURLtoFile(imageData, 'image.jpeg');
      let snapshotData = new FormData();
      snapshotData.append('image', file);
      const apiEndpoint = `/sop/${this.__page.projectId}/image.json?video_id=${this.__page.videoId}`;
      this.__sidebarService.sendSnapshot(apiEndpoint, snapshotData).subscribe(res=>{
        console.log("Response on taking snapshot", res);
        this.snackBar.open('Snapshot taken successfully', 'Success', {duration: 3000});
      },
      err=>{
        console.log("Error while saving snapshot", err);
        this.snackBar.open('An error occured while saving snapshot', 'Failed', {duration: 3000});
      },
      ()=>{
      });
      this.createdImage = imageData;
      // console.log(file);
    }
  }

  onSelectedVideo($event:any){
    this.videoPlayer.nativeElement.pause();
    this.isPlaying =  false;
    this.playThisVideo = $event.content.video_url;
    this.videoName = $event.content.video_name;
    this.__page.videoId = $event.content.id;
    this.progress = this.videoPlayer.nativeElement.currentTime = 0;
    this.duration = this.convertSecondsToMinutes(0);
    this.currentTime = this.convertSecondsToMinutes(0);
  }
  
  onTimeUpdate($event){
    if(isNaN(this.videoPlayer.nativeElement.duration)){
      this.duration = this.convertSecondsToMinutes(0);
    }else{
      this.duration = this.convertSecondsToMinutes(this.videoPlayer.nativeElement.duration);
    }
    this.currentTime = this.convertSecondsToMinutes(this.videoPlayer.nativeElement.currentTime);
    this.progress = (this.videoPlayer.nativeElement.currentTime / this.videoPlayer.nativeElement.duration) * 100;
    if(this.videoPlayer.nativeElement.currentTime == this.videoPlayer.nativeElement.duration){
      this.videoPlayer.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  convertSecondsToMinutes(time:number){
    var toHHMMSS = (secs) => {
      var sec_num = parseInt(secs, 10)    
      var hours   = Math.floor(sec_num / 3600) % 24
      var minutes = Math.floor(sec_num / 60) % 60
      var seconds = sec_num % 60    
      return [hours,minutes,seconds]
          .map(v => v < 10 ? "0" + v : v)
          .filter((v,i) => v !== "00" || i > 0)
          .join(":");
    }

    return toHHMMSS(time);
  }

  onChangeCurrentTime($event){
    let actualTime = ($event / 100) * this.videoPlayer.nativeElement.duration;
    let bufferedStart = this.videoPlayer.nativeElement.buffered.start(0);
    this.videoPlayer.nativeElement.currentTime = actualTime;
  }

  onTabChange(value:number){
    if(value == 1){
      this.fetchAllSnapshotsAlreadyTaken();
    }
  }

  onVideoUpload($event){
    const apiEndpoint = `/sop/${this.__page.projectId}/video.json`;
    let videoData = new FormData();
    videoData.append('video', $event);
    this.videoUpload = this.__sidebarService.sendVideo(apiEndpoint, videoData)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(event=>{
      if (event.type === HttpEventType.UploadProgress) {
        // This is an upload progress event. Compute and show the % done:
        this.uploadProgress = true;
        const percentDone = Math.round(100 * event.loaded / event.total);
        this.uploadProgressPercentage = percentDone;
        this.uploadProgressText = `File is ${percentDone}% uploaded.`;
        console.log(`File is ${percentDone}% uploaded.`);
      } else if (event instanceof HttpResponse) {
        this.uploadProgressText = 'File is completely uploaded!';
        console.log('File is completely uploaded!');
      }
    },
    err=>{
      console.log("Error while uploading video", err);
    },
    ()=>{
      this.fetchAllVideosAlreadyUploaded();
      this.uploadProgress = false;
    });
  }

  onDeleteVideo($event){
    console.log($event);
    const apiEndpoint = `/sop/video/${$event.content.id}.json`;
    this.__sidebarService.deleteContent(apiEndpoint).subscribe(res=>{
      this.videoGalleryContent.splice($event.index, 1);
    },
    err=>{
      console.log("Error while deleteing video", err);
    },
    ()=>{
      if($event.index - 1 != -1 && $event.index != this.videoGalleryContent.length -1){
        this.playThisVideo = this.videoGalleryContent[$event.index - 1].video_url;
      }
    });
  }

  onCancelVideoUpload(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onDeleteImage($event){
    const apiEndpoint = `/sop/image/${$event.content.id}.json`;
    this.__sidebarService.deleteContent(apiEndpoint).subscribe(res=>{
      this.imageGalleryContent.splice($event.index, 1);
      this.__page.imageGalleryContent.splice($event.index, 1);
      this.snackBar.open('Snapshot deleted successfully', 'Success', {duration: 3000});
    },
    err=>{
      console.log("Error while deleting snapshot", err);
      this.snackBar.open('Failed to delete the selected snapshot', 'Failed', {duration: 3000});
    })
  }
}
