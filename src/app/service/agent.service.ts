import {Injectable, OnInit} from '@angular/core';
import {catchError, map, Observable, of, Subject} from "rxjs";
import {AgentStatus} from "../shared/model/agent";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  public status = new Subject<AgentStatus>()

  constructor(private http: HttpClient) {
    setInterval(() => {
      this.updateStatus()
    }, 3000)
  }


  updateStatus() {
    console.log("update")
    this.http.get<{ status: AgentStatus }>(environment.agentUrl + "/status")
      .pipe(
        map(resp => resp.status),
        catchError((error) => {
          console.error(error)
          return of(AgentStatus.OFFLINE)
        }),
      )
      .subscribe(status => {
        this.status.next(status)
      })
  }


}
