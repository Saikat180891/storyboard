import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  lastNumber:number = 0;
  ID:number = 0;
  colorPicker:string[] =["#0033A1", "#2A7DE1", "#40C0C4", "#54585A", "#8677C4", "#94BEF0"]
  cardContent = [
    {
      id: this.getID(),
      // title:"Project title 1",
      // themeColor: this.colorPicker[this.getUniqueNumber()],
      // dueDate: "24/11/18",
      // reasonCodes: this.firstZero(5),
      // clientName: "saikat paul",
      // logo: 'https://blueridgeboxerrescue.com/wp-content/uploads/2015/01/Different-Amazon-Logo-small.png',
      // image: ['https://blueridgeboxerrescue.com/wp-content/uploads/2015/01/Different-Amazon-Logo-small.png',
      //         'https://blueridgeboxerrescue.com/wp-content/uploads/2015/01/Different-Amazon-Logo-small.png']
    },
    {
      id: this.getID(),
      title:"Cornell Projects",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "12/11/2018",
      reasonCodes: this.firstZero(6),
      chargeCode: "xxxx",
      clientName: "saikat paul",
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1000px-Cornell_University_seal.svg.png',
      assigneeList: [   ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval']
                    ]       

    },
    {
      id: this.getID(),
      title:"Cornell Projects",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "20/10/2018",
      reasonCodes: this.firstZero(6),
      chargeCode: "xxxx",
      clientName: "saikat paul",
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1000px-Cornell_University_seal.svg.png',
      assigneeList: [   ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval']
                    ]   
      
    },
    {
      id: this.getID(),
      title:"Amazon Projects",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "10/11/2018",
      reasonCodes: this.firstZero(6),
      chargeCode: "xxxx",
      clientName: "saikat paul",
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1000px-Cornell_University_seal.svg.png',
      assigneeList: [   ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        
                    ]   
      
    },
    {
      id: this.getID(),
      title:"XYZ Projects",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "22/11/2018",
      reasonCodes: this.firstZero(6),
      chargeCode: "xxxx",
      clientName: "saikat paul",
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1000px-Cornell_University_seal.svg.png',
      assigneeList: [   ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        
                    ]   
      
    },
    {
      id: this.getID(),
      title:"ABC Projects",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "12/8/2018",
      reasonCodes: this.firstZero(6),
      chargeCode: "xxxx",
      clientName: "saikat paul",
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1000px-Cornell_University_seal.svg.png',
      assigneeList: [   ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        
                    ]   
      
    },
    {
      id: this.getID(),
      title:"PQR Projects",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "6/11/2018",
      reasonCodes: this.firstZero(6),
      chargeCode: "xxxx",
      clientName: "saikat paul",
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1000px-Cornell_University_seal.svg.png',
      assigneeList: [   ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                        
                    ]   
      
    }

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

  constructor() { 

    
  }

  getData(){
    return this.cardContent;
  }

  // getDataObservable():Observable<CardDate[]>{
  //   return of(this.cardContent)
  // }
  
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

  removeBackdropData(item){
    let pos = this.backdropData.indexOf(item);
    this.backdropData.splice(pos, 1);
  }

  setCardContent(title, dueDate, chargeCode, logo){
    this.cardContent.push(
      {
        id: this.getID(),
        title:title,
        themeColor: this.colorPicker[this.getUniqueNumber()],
        dueDate: dueDate,
        reasonCodes: this.firstZero(6),
        chargeCode: chargeCode,
        clientName: "saikat paul",
        logo: logo,
        assigneeList: [   ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                          ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                          ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                          ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval'],
                          ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg', 'Shubhrangshu Naval']
                      ]   
        
      }
    );
    return true;
  }

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