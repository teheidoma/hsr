import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationService} from "../../service/registration.service";
import {AgentService} from "../../service/agent.service";
import {AgentStatus} from "../../shared/model/agent";
@Component({
  selector: 'app-registration-start',
  templateUrl: './registration-start.component.html',
  styleUrls: ['./registration-start.component.css']
})
export class RegistrationStartComponent implements OnInit, OnDestroy {
  ss: any;
  constructor(private registrationService: RegistrationService,
              private agentService: AgentService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.ss = setInterval(() => {
      this.registrationService.getState()
        .subscribe(response => {
          console.log('status', response)
          if (response.status == 'IMPORT') {
            this.router.navigate(['registration', 'import'])
          } else if (response.status == 'DONE') {
            this.router.navigate(['registration', 'finish'])
          }
        })
    }, 1000);
    this.agentService.status.subscribe(status => {
      if(status == AgentStatus.TOKEN_ERROR) {
        this.router.navigate(['registration', 'errortoken'])
      }
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.ss)
  }


}
