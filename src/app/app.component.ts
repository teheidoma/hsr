import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegistrationService} from "./service/registration.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hsr-stats';

  constructor(private registrationService: RegistrationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token == null) {
      this.registrationService.init()
        .subscribe(() => {
          this.router.navigate(['registration'])
        })
    }
  }


  needSoloFocus() {
    return this.router.url.indexOf('registration') >= 0;
  }
}
