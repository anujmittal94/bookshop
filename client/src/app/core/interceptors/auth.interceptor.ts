import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let idToken = localStorage.getItem('idToken') || '';
    if (idToken != '') {
      const modified_req = request.clone({
        params: new HttpParams().set('auth', idToken),
      });
      return next.handle(modified_req);
    }
    return next.handle(request);
  }
}
