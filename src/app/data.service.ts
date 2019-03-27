import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { ResponseContentType } from "@angular/http";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

export const httpOptions = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: "root",
})
export class DataService implements OnInit {
  lastNumber: number = 0;
  production: boolean = true;
  ID: number = 0;
  colorPicker: string[] = [
    "#0033A1",
    "#2A7DE1",
    "#40C0C4",
    "#54585A",
    "#8677C4",
    "#94BEF0",
  ];
  apiUrl = environment.production
    ? window.location.origin
    : "http://localhost:8000";
  httpClient: any;
  headers: any;

  constructor(private http: HttpClient, private cookie: CookieService) {}

  ngOnInit() {
    this.getCSRFToken();
    this.headers = httpOptions.headers.set("X-CSRFToken", this.getCSRFToken());
  }

  getBaseURL() {
    return this.apiUrl;
  }

  /**
   * Get CSRF token from the cookie by using the cookie service class
   */

  getCSRFToken() {
    return this.cookie.get("csrftoken");
  }

  /**
   * Get the data from the server to load the cards
   */
  fetchData(param) {
    return this.http.get<any[]>(this.apiUrl + param, { withCredentials: true });
  }

  fetchDataWithLimits(startLimit, endLimit) {
    return this.http.get<any[]>(this.apiUrl);
  }

  postData(param, body) {
    return this.http.post<any>(this.apiUrl + param, body, {
      withCredentials: true,
      headers: httpOptions.headers.set("X-CSRFToken", this.getCSRFToken()),
    });
  }

  postLogin(param, body) {
    return this.http.post<any>(this.apiUrl + param, body, {
      withCredentials: true,
    });
  }

  fetchFile(param) {
    return this.http.get(this.apiUrl + param, {
      responseType: "blob",
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  postDataWithProgress(param, body) {
    return this.http.post(this.apiUrl + param, body);
  }

  delete(param, id) {
    return this.http.delete(this.apiUrl + param + "/" + id, {
      withCredentials: true,
      headers: httpOptions.headers.set("X-CSRFToken", this.getCSRFToken()),
    });
  }

  update(param, id, body) {
    return this.http.put(this.apiUrl + param + "/" + id, body, {
      withCredentials: true,
      headers: httpOptions.headers.set("X-CSRFToken", this.getCSRFToken()),
    });
  }

  getAToken(endpoint, authcode) {
    return this.http.get(this.apiUrl + endpoint, authcode);
  }

  getPermission(num: number, id?: number | string) {
    if (id === undefined) {
      id = "";
    }
    return this.fetchData(
      `/user/group/permissions.json?proj_id=${id}&page_no=${num}`
    );
  }

  uploadFile(endpoint: string, payload: any): Observable<any> {
    const req = new HttpRequest("POST", this.apiUrl + endpoint, payload, {
      reportProgress: true,
      headers: httpOptions.headers,
    });
    return this.http.request(req);
  }

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(this.apiUrl + endpoint, body, {
      withCredentials: true,
      headers: httpOptions.headers.set("X-CSRFToken", this.getCSRFToken()),
    });
  }

  get(endpoint: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + endpoint, {
      withCredentials: true,
      headers: httpOptions.headers.set("X-CSRFToken", this.getCSRFToken()),
    });
  }

  deleteValue(endpoint: string): Observable<any> {
    return this.http.delete(this.apiUrl + endpoint, {
      withCredentials: true,
      headers: httpOptions.headers.set("X-CSRFToken", this.getCSRFToken()),
    });
  }

  updatePost(endpoint: string, body: any) {
    return this.http.put(this.apiUrl + endpoint, body, {
      withCredentials: true,
      headers: httpOptions.headers.set("X-CSRFToken", this.getCSRFToken()),
    });
  }
}

interface CardContents {
  obj: Object;
}

interface CardDate {
  id: number;
  title: string;
  themeColor: string;
  dueDate: string;
  numberEpics: number;
  chargeCode: string;
  clientName: string;
  logo: string;
  assigneeList: [[string, string]];
}
