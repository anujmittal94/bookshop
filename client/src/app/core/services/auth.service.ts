import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model.model';
import { LoginResponse, RefreshResponse } from '../models/login-response.model';
import { Observable, shareReplay, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signinUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase_key}`;
  refreshUrl: string = `https://identitytoolkit.googleapis.com/v1/token?key=${environment.firebase_key}`;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  // Login

  loginUser(user: LoginModel) {
    return this.http
      .post<LoginResponse>(this.signinUrl, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          this.setToken(res);
          this.toastrService.success('Login Successful');
        }),
        shareReplay()
      );
  }

  setToken(authResult: LoginResponse) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('refreshToken', authResult.refreshToken);
  }

  // Logout

  logoutUser(): void {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('refreshToken');
    this.toastrService.success('Logout Successful');
    this.router.navigate(['/']);
  }

  // Expiration and Auth

  isAuthenticated() {
    if (localStorage.getItem('idToken')) {
      return true;
    }
    return false;
  }

  isNotExpired() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiresAt');
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  // Refresh

  refreshToken(): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', localStorage.getItem('refreshToken')!);

    return this.http
      .post<RefreshResponse>(this.refreshUrl, body)
      .pipe(tap((res) => this.setRefreshedToken(res)));
  }

  setRefreshedToken(refreshResult: RefreshResponse) {
    console.log('here');
    const expiresAt = moment().add(refreshResult.expires_in, 'second');
    localStorage.setItem('idToken', refreshResult.id_token);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('refreshToken', refreshResult.refresh_token);
  }
}
