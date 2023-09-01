import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RegistrationInitResponseDTO} from "../dto/auth";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) {
  }

  init(): Observable<RegistrationInitResponseDTO> {

    return this.httpClient.get<RegistrationInitResponseDTO>(environment.baseUrl + '/registration/init')
      .pipe(
        tap(resp => {
          localStorage.setItem('id', resp.id)
          localStorage.setItem('token', resp.token)
        })
      )
  }

  getState(): Observable<{ status: string }> {
    return this.httpClient.get<{ status: string }>(environment.baseUrl + '/registration/state')
  }
}
