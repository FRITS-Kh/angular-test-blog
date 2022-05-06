import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { FbAuthResponse, User } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  errors$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(
        tap((data) => this.setToken(data as FbAuthResponse)),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  private setToken(response: FbAuthResponse | null): void {
    if (!response) {
      localStorage.clear();
      return;
    }

    const expDate = new Date(
      new Date().getTime() + Number(response.expiresIn) * 1000
    );
    localStorage.setItem('fb-token', response.idToken);
    localStorage.setItem('fb-token-exp', expDate.toString());
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const { message } = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.errors$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.errors$.next('Invalid password');
        break;
      case 'USER_DISABLED':
        this.errors$.next('Invalid user');
        break;
    }
    return throwError(() => error);
  }

  get token(): string | null {
    if (
      !localStorage.getItem('fb-token') ||
      !localStorage.getItem('fb-token-exp')
    ) {
      this.logout();
      return null;
    }

    const expDate = new Date(localStorage.getItem('fb-token-exp')!);

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('fb-token');
  }
}
