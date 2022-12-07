import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model.model';
import { LoginResponse } from '../models/login-response.model';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signinUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase_key}`;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  loginUser(user: LoginModel) {
    return this.http
      .post<LoginResponse>(this.signinUrl, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('idToken', res.idToken);
          this.toastrService.success('Login Successful');
          this.router.navigate(['/']);
        })
      );
  }

  isAuthenticated() {
    let idToken = localStorage.getItem('idToken') || '';
    if (idToken != '') {
      return true;
    }
    return false;
  }

  logoutUser(): void {
    localStorage.removeItem('idToken');
    this.toastrService.success('Logout Successful');
    this.router.navigate(['/']);
  }
}
