import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationService} from "../../service/registration.service";

@Component({
  selector: 'app-registration-start-import',
  templateUrl: './registration-import.component.html',
  styleUrls: ['./registration-import.component.css']
})
export class RegistrationImportComponent implements OnInit, OnDestroy{
  ss: any;
  constructor(private registrationService: RegistrationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.ss = setInterval(() => {
      this.registrationService.getState()
        .subscribe(response => {
          console.log('status', response)
           if (response.status == 'DONE') {
            this.router.navigate(['registration', 'finish'])
          }
        })
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.ss)
  }

}
