import { Injectable } from '@angular/core';
import {DataService} from '../../../../data.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

let httpOptions = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  accessToken = {withCredentials:true, headers: httpOptions.set('X-CSRFToken', this.cookie.get("csrftoken"))};

  constructor(private __api:DataService, private http:HttpClient, private cookie:CookieService) { }

  uploadFile(endpoint:string, payload:any):Observable<any>{
    const req = new HttpRequest(
      'POST', 
      this.__api.apiUrl + endpoint, 
      payload, 
      {reportProgress:true, withCredentials:true, headers: httpOptions.set('X-CSRFToken', this.cookie.get("csrftoken"))}
      );
    return this.http.request(req);
    // return this.http.post(this.__api.apiUrl + endpoint, payload, {withCredentials: true, headers: httpOptions.set('X-CSRFToken', this.cookie.get("csrftoken"))});
  }

  sendVideo(endpoint:string, payload:any):Observable<any>{
    return this.uploadFile(endpoint, payload);
  }

  getAllUploadedVideo(endpoint:string):Observable<any>{
    return this.http.get(this.__api.apiUrl + endpoint, {withCredentials:true, headers: httpOptions.set('X-CSRFToken', this.cookie.get("csrftoken"))});
  }

  sendSnapshot(endpoint:string, payload:any){
    return this.http.post(this.__api.apiUrl + endpoint, payload, {withCredentials:true, headers: httpOptions.set('X-CSRFToken', this.cookie.get("csrftoken"))});
  }

  getAllThumbnails(endpoint:string){
    return this.http.get(this.__api.apiUrl + endpoint, this.accessToken);
  }

  videoStreaming(endpoint:string){
    return this.http.get(endpoint, this.accessToken);
  }

  deleteContent(endpoint:string){
    return this.http.delete(this.__api.apiUrl + endpoint, this.accessToken);
  }
}
