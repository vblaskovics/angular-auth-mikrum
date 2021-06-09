import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = `${this.config.apiUrl}login`;
  logoutUrl = `${this.config.apiUrl}logout`;

  currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  lastToken: string = '';
  storageName = 'currentUser';

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private userService: UserService,
    private router: Router
    ) {}

  login(loginData: User): Observable<User | User[] | null> {
    return this.http.post<{ accessToken: string }>(
      this.loginUrl,
      { email: loginData.email, password: loginData.password }
    ).pipe(
      switchMap( (response) => {
        if (response.accessToken) {
          this.lastToken = response.accessToken;
          return this.userService.query(`email=${loginData.email}`)
        }
        return of(null);
      })
    ).pipe(
      tap( user => {
        if (!user) {
          localStorage.removeItem(this.storageName);
          this.currentUserSubject.next(null);
        } else {
          let userObj:User;
          if (Array.isArray(user)) {
            userObj = user[0];
          } else {
            userObj = user;
          }

          userObj.token = this.lastToken;
          localStorage.setItem(this.storageName, JSON.stringify(userObj));
          this.currentUserSubject.next(userObj);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
  
}
