import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-start-finish',
  templateUrl: './registration-finish.component.html',
  styleUrls: ['./registration-finish.component.css']
})
export class RegistrationFinishComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(["/"])
    }, 2000)
  }

}
