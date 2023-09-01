import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError} from "rxjs";
import {AgentService} from "../../service/agent.service";
import {AgentStatus} from "../../shared/model/agent";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-registration-start-token',
  templateUrl: './registration-token.component.html',
  styleUrls: ['./registration-token.component.css']
})
export class RegistrationTokenComponent implements OnInit {

  constructor(private httpClient: HttpClient,
              private agentService: AgentService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.agentService.status.subscribe(status => {
      if (status == AgentStatus.TOKEN_ERROR) {
        this.router.navigate(['registration', 'errortoken'])
      }
    })
    this.httpClient.post(environment.agentUrl + '/token', {
      id: localStorage.getItem("id"),
      token: localStorage.getItem('token')
    })
      .pipe(catchError(error => {
        console.error("token", error)
        throw new Error();
      }))
      .subscribe(() => {
        // @ts-ignore
        window.top.close()
      })
  }


}
