import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
import {environment} from '../environments/environment';
import { HttpHeaders} from '@angular/common/http';
import { ResponseContentType } from '@angular/http'
import { CookieService } from 'ngx-cookie-service';


export const httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})

export class DataService implements OnInit {
  lastNumber:number = 0;
  production:boolean = true;
  ID:number = 0;
  colorPicker:string[] =["#0033A1", "#2A7DE1", "#40C0C4", "#54585A", "#8677C4", "#94BEF0"]
  apiUrl = environment.production ? window.location.origin :'http://localhost:8000';
  cardContent = [
    {
      id: 0,
    },
  ];

  backdropData = [
    ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
    ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Saikat paul'],
    ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Manjit'],
    ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Sujit'],
    ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Kanishka'],
    ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Manbir'],
    ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shravan'],
    ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Aadesh'],
    ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Praveen'],
                        
  ]
  httpClient: any;
  



  constructor(private http: HttpClient, private cookie:CookieService) {  }

  ngOnInit(){
    this.getCSRFToken()
  }

  getData(){
    return this.cardContent;
  }
  
  getBackdropData(){
    return this.backdropData;
  }
  
  /**
   * Get CSRF token from the cookie by using the cookie service class
   */
  getCSRFToken(){
    return this.cookie.get("csrftoken");
  }

  addBackdropData(imagePath, assigneeName){
    console.log("ADD ",assigneeName, imagePath)
    this.backdropData.unshift([imagePath, assigneeName]);
    console.log(this.backdropData);
    if(this.backdropData.indexOf([imagePath, assigneeName])==-1){
      return false;
    }else{
      return true;
    }
    
  }

  removeBackdropData(id, item){
    console.log(id)
    let pos = this.cardContent.indexOf(id);
    console.log(pos)
    
  }

  setCardContent(title, dueDate, chargeCode, logo){
    this.cardContent.push(
      
    );
    return true;
  }



  /**
   * Get the data from the server to load the cards
   */
  fetchData(param){
    // console.log(this.apiUrl + param)
    return this.http.get<any[]>(this.apiUrl + param, {withCredentials: true});
  }

  fetchDataWithLimits(startLimit, endLimit){
    return this.http.get<any[]>(this.apiUrl);
  }

  postData(param, body){
    return this.http.post<any>(this.apiUrl + param, body, 
      {withCredentials: true, headers: httpOptions.headers.set('X-CSRFToken', this.getCSRFToken())});
  }

  fetchFile(param){
    return this.http.get(this.apiUrl + param, {responseType: 'blob', headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  postDataWithProgress (param, body){
    return this.http.post(this.apiUrl + param, body);
  }

  delete(param, id){
    return this.http.delete(this.apiUrl + param + '/' + id, 
    {withCredentials: true, headers: httpOptions.headers.set('X-CSRFToken', this.getCSRFToken())});
  }

  update(param, id, body){
    return this.http.put(this.apiUrl + param + '/' + id, body, 
    {withCredentials: true, headers: httpOptions.headers.set('X-CSRFToken', this.getCSRFToken())});
  }

  getAToken(endpoint, authcode){
    return this.http.get(this.apiUrl + endpoint, authcode);
  }

  getPermission(num:number, id?:number|string){
    if(id === undefined){
      id = '';
    }
    return this.fetchData(`/user/group/permissions.json?proj_id=${id}&page_no=${num}`);
  }

}

interface CardContents{
  obj:Object
}

interface CardDate{
  id: number,
  title:string,
  themeColor: string,
  dueDate: string,
  reasonCodes: number,
  chargeCode: string,
  clientName: string,
  logo: string,
  assigneeList: [   [string, string]
                ]
}