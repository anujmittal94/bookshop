import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  Observable,
  BehaviorSubject,
  switchMap,
  filter,
  take,
} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RefreshResponse } from '../models/login-response.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const idToken = localStorage.getItem('idToken');
    return next.handle(this.addToken(request, idToken)).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 401) {
          return this.handle401Error(request, next);
        }
        if (e.status === 403) {
          this.authService.logoutUser();
          this.toastrService.warning(
            'Please login with a valid account to access this content'
          );
          this.router.navigate(['/auth']);
        }
        throw e;
      })
    );
  }

  private addToken(request: HttpRequest<any>, idToken: string | null) {
    if (idToken) {
      return request.clone({
        //setHeaders: { Authorization: `Bearer ${idToken}` },
        //headers: request.headers.set('Authorization', 'Bearer' + idToken),
        params: new HttpParams().set('auth', idToken),
      });
    }
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((res: RefreshResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(res.id_token);
          // repeat failed request
          return next.handle(this.addToken(request, res.id_token));
        })
      );
    } else {
      // wait while getting new token (new requests?)
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          // repeat failed request
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }
}
