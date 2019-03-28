import { Injectable } from "@angular/core";
import { DataService } from "../../../../data.service";
import { Observable } from "rxjs";
import { Screen, ScreenItem } from "../../models/Screen.model";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class SopApiService {
  constructor(private http: DataService) {}

  createScreen(projectId: number, payload: any): Observable<any>{
    const endpoint = `/sop/${projectId}/epics/userstories/sections/screens.json`;
    return this.http.postData(endpoint, payload).pipe(map((res:any)=>{
      const screenItem = new ScreenItem(res);
      return screenItem.receiveScreenItem();
    }));
  }

  getScreenList(projectId: number): Observable<any>{
    const endpoint = `/sop/${projectId}/epics/userstories/sections/screens.json`;
    return this.http.get(endpoint).pipe(map((res:any[])=>{
      return res.map(item =>{
        const screenItem = new ScreenItem(item);
        return screenItem.receiveScreenItem();
      });
    }));
  }

  deleteScreen(screenId: number): Observable<any>{
    const endpoint = `/sop/epics/userstories/sections/screens/${screenId}json`;
    return this.http.deleteValue(endpoint);
  }

  updateScreen(screenId: number, payload: any): Observable<any>{
    const endpoint = `/sop/epics/userstories/sections/screens/${screenId}json`;
    return this.http.updatePost(endpoint, payload).pipe(map((res:any)=>{
      const screenItem = new ScreenItem(res);
      return screenItem.receiveScreenItem();
    }));
  }
}
