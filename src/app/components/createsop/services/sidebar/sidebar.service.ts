import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { DataService } from "../../../../data.service";

const httpOptions = new HttpHeaders();

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  accessToken = {
    withCredentials: true,
    headers: httpOptions.set("X-CSRFToken", this.cookie.get("csrftoken")),
  };

  constructor(
    private __api: DataService,
    private http: HttpClient,
    private cookie: CookieService
  ) {}

  /**
   *Function helps to upload a file by sending a post request to backend
   * @param endpoint : End Point or url
   * @param payload : Payload or data to be send to backend
   */
  uploadFile(endpoint: string, payload: any): Observable<any> {
    const req = new HttpRequest("POST", this.__api.apiUrl + endpoint, payload, {
      reportProgress: true,
      withCredentials: true,
      headers: httpOptions.set("X-CSRFToken", this.cookie.get("csrftoken")),
    });
    return this.http.request(req);
  }

  /**
   * Sends video by calling uploadFile function
   * @param endpoint : End Point or url
   * @param payload : Payload or Data to be send to backend
   */
  sendVideo(endpoint: string, payload: any): Observable<any> {
    return this.uploadFile(endpoint, payload);
  }

  /**
   * Sends a Get Request to Backend to get AllUploaded Videos
   * @param endpoint : EndPoint or url
   */
  getAllUploadedVideo(endpoint: string): Observable<any> {
    return this.http.get(this.__api.apiUrl + endpoint, {
      withCredentials: true,
      headers: httpOptions.set("X-CSRFToken", this.cookie.get("csrftoken")),
    });
  }

  /**
   * Sends a Post Request to backend to post a screenshot.
   */
  sendSnapshot(endpoint: string, payload: any) {
    return this.http.post(this.__api.apiUrl + endpoint, payload, {
      withCredentials: true,
      headers: httpOptions.set("X-CSRFToken", this.cookie.get("csrftoken")),
    });
  }

  /**
   * Sends a get request to backend to get all the thumbnails
   */
  getAllThumbnails(endpoint: string) {
    return this.http.get(this.__api.apiUrl + endpoint, this.accessToken);
  }

  /**
   * Sends a get request to backend to get video streaming data
   * @param endpoint : End Point or Url
   */
  videoStreaming(endpoint: string) {
    return this.http.get(endpoint, this.accessToken);
  }

  /**
   * Delete Request to Backend to delete content as per end point
   * @param endpoint: End Point or Url
   */
  deleteContent(endpoint: string) {
    return this.http.delete(this.__api.apiUrl + endpoint, this.accessToken);
  }

  /**
   * Post Request to Backend to upload an image
   * @param endpoint : End point or Url
   * @param file : File to be uploaded
   */
  uploadImage(endpoint: string, file) {
    return this.http.post(this.__api.apiUrl + endpoint, file, this.accessToken);
  }
}
