import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../model/user';
import { jwtDecode } from 'jwt-decode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../app/components/authentication/login/login.component';

export interface AuthResponseData {
  access_token: string;
  refresh_token: string;
  user: {
    email: string;
    firstname: string;
    lastname: string;
  };
  expirationDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  returnUrl: string = '';
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) {}

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, { centered: true });
    modalRef.componentInstance.loginSuccess.subscribe(() => {
      modalRef.close(); // Chiudi la modal quando il login è completato con successo
      if (this.returnUrl && this.returnUrl !== '/') {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }

  checkStatus() {
    if (this.user.value) {
      return this.user.value;
    }
    return null;
  }

  checkLocalStorage() {
    const storedUserData = localStorage.getItem('userData');
    console.log(storedUserData);
    if (storedUserData) {
      const userD: User = User.fromJSON(storedUserData);
      console.log('reading token: ' + userD.token);
      console.log(userD);
      console.log(userD.constructor);
      this.user.next(userD);
    }
  }

  getUser(): User | null {
    return this.user.value;
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
  }

  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    birthdate: string
  ): Observable<AuthResponseData> {
    const registerData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      birthdate: birthdate,
      role: 'USER',
    };

    return this.http
      .post<AuthResponseData>(this.baseUrl + '/api/auth/register', registerData)
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          console.log('chiamata tap');
          this.handleAuthentication(
            resData.access_token,
            resData.refresh_token,
            resData.user,
            resData.expirationDate
          );
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    const loginData = {
      email: email,
      password: password,
    };

    return this.http
      .post<AuthResponseData>(this.baseUrl + '/api/auth/login', loginData)
      .pipe(
        catchError(this.handleError),
        tap((resData: AuthResponseData) => {
          console.log(resData);
          this.handleAuthentication(
            resData.access_token,
            resData.refresh_token,
            resData.user,
            resData.expirationDate
          );
        })
      );
  }

  private handleAuthentication(
    token: string,
    refreshToken: string,
    user: any,
    expirationDate: Date
  ): void {
    const newUser = new User(
      user.id,
      user.email,
      token,
      expirationDate,
      user.firstname,
      user.lastname,
      user.role
    );
    console.log('sto per pubblicare lo user');
    console.log(newUser);
    console.log(JSON.stringify(newUser));
    this.user.next(newUser);
    this.storeUserData(newUser);
  }

  private storeUserData(user: User): void {
    console.log(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.message) {
      case 'EMAIL_EXIST':
        errorMessage = 'This email exists already';
        break;
      case 'WRONG_PASSWORD':
        errorMessage = 'This password is wrong.';
        break;
      // case 'INVALID_PASSWORD':
      //   errorMessage = 'This password is not correct.';
      //   break;
    }
    return throwError(() => errorMessage);
  }
}
function jwt_decode(access_token: any): any {
  throw new Error('Function not implemented.');
}

