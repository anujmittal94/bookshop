import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        let errorMsg = '';
        if (e.error instanceof ErrorEvent) {
          console.log('This is a clientside error');
          errorMsg = `Error ${e.error.message}`;
        } else {
          console.log('This is server side error');
          errorMsg = `Error Code: ${e.status}, Message: ${e.message}`;
        }
        console.log(errorMsg);
        this.toastrService.error(
          'Something went wrong, please try again later!'
        );
        throw e;
      })
    );
  }
}
