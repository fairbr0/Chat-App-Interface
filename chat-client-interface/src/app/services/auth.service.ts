import { Injectable, EventEmitter } from '@angular/core'
import { User } from '../models/user';
import { USERS } from '../data/mock-users';

export class AuthService {
  private self : User;
  private authenticated: boolean = false;
  private token: string;

  private locationWatcher = new EventEmitter();

  doLogin(username, password) : boolean {
    //try to log in
    //parse response and get token
    this.authenticated = true;
    this.self = USERS[0];
    return true;
  }

  doLogout() {
    this.authenticated = false;
    this.self = null;
  }

  public isAuthenticated() {
        return this.authenticated;
    }

  public getUserInfo() : User {
    return this.self;
  }

  public subscribe(onNext: (value:any) => void, onThrow?: (exception: any) => void, onReturn?: () => void) {
    return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
  }
}
