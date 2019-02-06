import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import {UicontrolService} from '../services/uicontrol.service';
import {SidebarService} from '../services/sidebar/sidebar.service';
import {PageService} from '../services/page/page.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', './volume-slider-handle.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
  @Output('close') close = new EventEmitter<any>();
  @ViewChild('videoPlayer') videoPlayer:ElementRef;
  @ViewChild('canvas') canvas:ElementRef;
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
  videoGalleryContent:any = [];
  imageGalleryContent:any = [];

  constructor(private __uic:UicontrolService, private __sidebarService:SidebarService, private __page:PageService) { }

  ngOnInit() {
    this.videoPlayer.nativeElement.volume = 0.5;
    this.fetchAllVideosAlreadyUploaded();
    this.fetchAllSnapshotsAlreadyTaken();
  }
  
  ngOnChanges(){
    // this.playThisVideo = this.content.content.video_url;
    // console.log(this.playThisVideo)
  }

  fetchAllVideosAlreadyUploaded(){
    this.__sidebarService.getAllUploadedVideo(`/sop/${this.__page.projectId}/video.json`).subscribe(res=>{
      this.videoGalleryContent = res;
      this.playThisVideo = this.videoGalleryContent[0].video_url;
      this.__page.videoId = this.videoGalleryContent[0].id;
      this.duration = this.convertSecondsToMinutes(0);
      this.currentTime = this.convertSecondsToMinutes(0);
      // console.log(res);
    },
    err=>{
      console.log("Error occured while fetching videos", err);
    },
    ()=>{}
    );
  }

  fetchAllSnapshotsAlreadyTaken(){
    this.__sidebarService.getAllThumbnails(`/sop/${this.__page.projectId}/image.json`).subscribe((res:any)=>{
      res.forEach(element => {
        element['thumbnail'] = element['image_url'];
      });
      this.imageGalleryContent = res;
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
    }else{
      this.videoPlayer.nativeElement.muted = false;
      this.isMuted = false;
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
      });
      this.createdImage = imageData;
      // console.log(file);
    }
  }

  onSelectedVideo($event:any){
    this.videoPlayer.nativeElement.pause();
    this.isPlaying = false;
    this.playThisVideo = $event.content.video_url;
    this.__page.videoId = $event.content.id;
    this.progress = this.videoPlayer.nativeElement.currentTime = 0;
    this.duration = this.convertSecondsToMinutes(0);
    this.currentTime = this.convertSecondsToMinutes(0);
    console.log($event, this.playThisVideo);
  }

  onTimeUpdate($event){
    this.duration = this.convertSecondsToMinutes(this.videoPlayer.nativeElement.duration);
    this.currentTime = this.convertSecondsToMinutes(this.videoPlayer.nativeElement.currentTime);
    this.progress = (this.videoPlayer.nativeElement.currentTime / this.videoPlayer.nativeElement.duration) * 100;
    // console.log(this.duration, this.currentTime, this.videoPlayer.nativeElement.currentTime)
  }

  convertSecondsToMinutes(sec:number){
    var measuredTime = new Date(null);
    measuredTime.setSeconds(sec);
    var MHSTime = measuredTime.toISOString().substr(11, 8);
    return MHSTime;
  }

  onChangeCurrentTime($event){
    console.log($event)
    let actualTime = ($event / 100) * this.videoPlayer.nativeElement.duration;
    console.log(actualTime);
    this.videoPlayer.nativeElement.pause();
    // this.videoPlayer.nativeElement.currentTime = Number(actualTime.toFixed(1));
    // this.videoPlayer.nativeElement.currentTime = 10;
    this.videoPlayer.nativeElement.play();
    console.log(this.videoPlayer)
  }

  onTabChange(value:number){
    if(value == 1){
      this.fetchAllSnapshotsAlreadyTaken();
    }
  }

  onCanPlay($event){
    console.log($event)
  }

  onVideoUpload($event){
    const apiEndpoint = `/sop/${this.__page.projectId}/video.json`;
    let videoData = new FormData();
    videoData.append('video', $event);
    this.__sidebarService.sendVideo(apiEndpoint, videoData).subscribe(res=>{
      this.fetchAllVideosAlreadyUploaded();
      console.log(res);
    });
  }
}
