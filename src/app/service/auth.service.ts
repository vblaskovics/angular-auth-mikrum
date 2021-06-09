import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = `${this.config.apiUrl}login`;
  logoutUrl = `${this.config.apiUrl}logout`;

  currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  lastToken: string = '';

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  constructor(private config: ConfigService) {}
}
