import { AuthService } from '../services/auth.service';
import { Observable, shareReplay, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RefreshResponse } from '../models/login-response.model';
import { environment } from 'src/environments/environment';

// export function initializeAppFactory(
//   authService: AuthService
// ): () => Observable<any> {
//   //const refreshUrl: string = `https://identitytoolkit.googleapis.com/v1/token?key=${environment.firebase_key}`;
//   return () => {
//     return authService.refreshToken();
//     // const body = new HttpParams()
//     //   .set('grant_type', 'refresh_token')
//     //   .set('refresh_token', localStorage.getItem('refreshToken')!);

//     // return http
//     //   .post<RefreshResponse>(refreshUrl, body)
//     //   .pipe(tap((res) => console.log(res)));
//   };
// }

// export function appInitializer(authenticationService: AuthService) {
//   return () =>
//     new Promise((resolve) => {
//       // attempt to refresh token on app start up to auto authenticate
//       authenticationService.refreshToken().subscribe();
//     });
// }
