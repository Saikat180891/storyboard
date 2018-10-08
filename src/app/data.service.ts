import { Injectable } from '@angular/core';

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
      title:"Project title 1",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "24/11/18",
      reasonCodes: this.firstZero(5),
      logo: 'https://blueridgeboxerrescue.com/wp-content/uploads/2015/01/Different-Amazon-Logo-small.png',
      image: ['https://blueridgeboxerrescue.com/wp-content/uploads/2015/01/Different-Amazon-Logo-small.png',
              'https://blueridgeboxerrescue.com/wp-content/uploads/2015/01/Different-Amazon-Logo-small.png']
    },
    {
      id: this.getID(),
      title:"Cornell Projects",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "24/11/18",
      reasonCodes: this.firstZero(6),
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1000px-Cornell_University_seal.svg.png',
      image: ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg']
    },
    {
      id: this.getID(),
      title:"Amazon Project",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "24/11/18",
      reasonCodes: this.firstZero(2),
      logo: 'http://www.creativehunt.co/wp-content/uploads/2016/02/Amazon-Logo-300x300.png',
      image: ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg']
    },
    {
      id: this.getID(),
      title:"Project title 3",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "26/11/18",
      reasonCodes: this.firstZero(5),
      logo: 'https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png.png',
      image: ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg']
    },
    {
      id: this.getID(),
      title:"Project title 4",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "14/11/18",
      reasonCodes: this.firstZero(15),
      logo: 'https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png.png',
      image: ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
      'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg']
    },
    {
      id: this.getID(),
      title:"Project title 5",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "12/11/18",
      reasonCodes: this.firstZero(2),
      logo: 'https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png.png',
      image: ['https://blueridgeboxerrescue.com/wp-content/uploads/2015/01/Different-Amazon-Logo-small.png',
              'https://blueridgeboxerrescue.com/wp-content/uploads/2015/01/Different-Amazon-Logo-small.png',
              'https://image.freepik.com/free-icon/apple-logo_318-40184.jpg',
              'https://blueridgeboxerrescue.com/wp-content/uploads/2015/01/Different-Amazon-Logo-small.png',
              'https://blueridgeboxerrescue.com/wp-content/uploads/2015/01/Different-Amazon-Logo-small.png',
              'https://image.freepik.com/free-icon/apple-logo_318-40184.jpg']
    },
    {
      id: 7,
      title:"Project title 6",
      themeColor: this.colorPicker[this.getUniqueNumber()],
      dueDate: "24/06/18",
      reasonCodes: this.firstZero(4),
      logo: 'https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png.png',
      image: ['http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
              'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
              'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg',
              'http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg']
    }
  ]

  private getUniqueNumber(){
    this.lastNumber += 1;
    if(this.lastNumber == 5){
      this.lastNumber = 0;
    }
    //console.log(this.lastNumber)
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
}
