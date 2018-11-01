import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  lastNumber:number = 0;
  ID:number = 0;
  colorPicker:string[] =["#0033A1", "#2A7DE1", "#40C0C4", "#54585A", "#8677C4", "#94BEF0"]
  apiUrl = 'http://127.0.0.1:8000';
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
  

  private getUniqueNumber(){
    this.lastNumber += 1;
    if(this.lastNumber == 5){
      this.lastNumber = 0;
    }
    return this.lastNumber;
  }

  private getID(){
    this.ID += 1;
    return this.ID; 
  }

  private firstZero(value){
    let temp = value.toString().split("");
    if(temp.length>1){
      return value;
    }else{
      return 0 + "" + value;
    }
  }

  constructor(private http: HttpClient) {  }

  getData(){
    return this.cardContent;
  }
  
  getBackdropData(){
    return this.backdropData;
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
    //  return this.http.get<any[]>("../assets/dummy_data/card_data.json");
    return this.http.get<any[]>(this.apiUrl + param);
  }

  fetchDataWithLimits(startLimit, endLimit){
    return this.http.get<any[]>(this.apiUrl);
  }

  postData(param, body){
    console.log(this.apiUrl + param , body)
    return this.http.post(this.apiUrl + param, body);
  }

  handleError(err){
    console.log(err)
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