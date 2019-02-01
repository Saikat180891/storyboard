import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import {UicontrolService} from '../services/uicontrol.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', './volume-slider-handle.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
  @ViewChild('videoPlayer') videoPlayer:ElementRef;
  isPlaying:boolean = false;
  isMuted:boolean = false;
  duration:any = "00:00";
  currentTime:any = "00:00";
  progress:number = 0;
  videos = [1, 2, 3, 4, 5, 6, 7, 8];
  currentImage:number = 0;

  carouselImages = [
    {
      image: '../../../../assets/pics/6-tips-best-video-custom-thumbnails-youtube.jpg'
    },
    {
      image: '../../../../assets/pics/2img.jpg'
    },
    {
      image: '../../../../assets/pics/3img.jpg'
    },
    {
      image: '../../../../assets/pics/4img.jpg'
    },
    {
      image: '../../../../assets/pics/5img.jpg'
    }
  ]

  constructor(private __uic:UicontrolService) { }

  ngOnInit() {
    this.videoPlayer.nativeElement.volume = 0.5;
  }
  
  ngOnChanges(){
    
  }
  //for carousel
  onCarouselMoveLeft(){
    if(this.currentImage < this.carouselImages.length - 1){
      this.currentImage = this.currentImage + 1;
      console.log(this.currentImage)
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

  onTimeUpdate($event){
    this.duration = this.convertSecondsToMinutes(this.videoPlayer.nativeElement.duration);
    this.currentTime = this.convertSecondsToMinutes(this.videoPlayer.nativeElement.currentTime);
    this.progress = (this.videoPlayer.nativeElement.currentTime / this.videoPlayer.nativeElement.duration) * 100;
  }

  convertSecondsToMinutes(time:any){
    // let newTime = new Date(time);
    let minutes:any = time.toFixed(0) / 60;
    return minutes.toFixed(2).split(".").join(":");
    // return newTime.getHours() + ":" + newTime.getMinutes() + ":" + newTime.getSeconds();
  }

  onChangeCurrentTime($event){
    let actualTime = ($event / 100) * this.videoPlayer.nativeElement.duration
    this.videoPlayer.nativeElement.currentTime = actualTime;
  }
}
