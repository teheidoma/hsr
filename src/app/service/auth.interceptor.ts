import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add header with basic auth credentials if user is logged in and request is to the api url
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const isLoggedIn = id != null && token != null
    const isApiUrl = request.url.startsWith(environment.baseUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${window.btoa(id + ':' + token)}`
        }
      });
    }

    return next.handle(request);
  }
}
