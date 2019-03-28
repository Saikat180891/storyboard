import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DataService } from "../../../data.service";
import { Sprint, SprintAdapter, SprintBackend } from "../models/Sprint.model";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private api: DataService) {}

  getSprint(sopId: number): Observable<Sprint[]> {
    const endpoint = `/sop/${sopId}/sprint.json`;
    return this.api.get(endpoint).pipe(
      map((res: Array<any>) => {
        return res.map(element => {
          const adapter = new SprintAdapter(element);
          return adapter.getSprints();
        });
      })
    );
  }

  deleteSprint(sopId: number): Observable<any> {
    const endpoint = `/sop/sprint/${sopId}.json`;
    return this.api.deleteValue(endpoint);
  }

  createSprint(sopId: number, payload: SprintBackend): Observable<Sprint> {
    const endpoint = `/sop/${sopId}/sprint.json`;
    return this.api.postData(endpoint, payload).pipe(
      map((res: Array<any>) => {
        const adapter = new SprintAdapter(res);
        return adapter.getSprints();
      })
    );
  }

  editSprint(sprintId: number, payload: SprintBackend): Observable<Sprint> {
    const endpoint = `/sop/sprint/${sprintId}.json`;
    return this.api.updatePost(endpoint, payload).pipe(
      map((res: Array<any>) => {
        const adapter = new SprintAdapter(res);
        return adapter.getSprints();
      })
    );
  }
}
