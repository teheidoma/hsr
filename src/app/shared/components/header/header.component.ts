import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {AgentService} from "../../../service/agent.service";
import {AgentStatus} from "../../model/agent";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  version: string = '';
  status: AgentStatus = AgentStatus.OFFLINE;

  constructor(private agentService: AgentService) {
  }

  ngOnInit(): void {
    this.version = environment.version;
    this.agentService.status.subscribe(status => {
      console.log('status', status, AgentStatus[status])
      this.status = status;
    })
  }

  protected readonly AgentStatus = AgentStatus;
}
