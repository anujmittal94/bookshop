export interface LoginResponse {
  idToken: string;
  expiresIn: string;
  refreshToken: string;
}

export interface RefreshResponse {
  id_token: string;
  expires_in: string;
  refresh_token: string;
}
