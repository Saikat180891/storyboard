export interface Screen{
  applicationName: string;
  screenName: string;
  tabName: string;
  imageUrl: string;
  imageId?: number;
  screenId?: number;
}

export class ScreenItem{
  applicationName: string;
  screenName: string;
  tabName: string;
  imageUrl: string;
  imageId: number;
  screenId?: number;

  constructor(screen: any){
    this.applicationName = screen.application_name;
    this.screenName = screen.screen_name;
    this.tabName = screen.tab_name;
    this.imageUrl = screen.image_url;
    this.imageId = screen.imageID;
    this.screenId = screen.id;
  }

  receiveScreenItem(){
    return {
      applicationName: this.applicationName,
      screenName: this.screenName,
      tabName: this.tabName,
      imageUrl: this.imageUrl,
      screenId: this.screenId,
      imageId: this.imageId
    }
  }
}