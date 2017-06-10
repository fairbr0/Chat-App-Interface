import { Injectable, EventEmitter } from '@angular/core'
import { User } from '../models/user';
import { USERS } from '../data/mock-users';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {
  private self : User = new User();
  private authenticated: boolean = false;
  private token: String;
  private authUrl : String = 'http://localhost:3000/api';

  constructor(private http: Http) {}
  private locationWatcher = new EventEmitter();
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  doSignUp(username, password) {
    this.http.post(this.authUrl + '/signup',
      JSON.stringify({name: username, password:password}),
      {headers: this.headers}
    )
    .map(res => res.json())
    .subscribe(info => {
      this.handleSignupResponse(info, username, password)
    }, err => {
      console.error("Failed to fetch info:", err);
    });
  }

  doLogin(username, password) {
    //try to log in
    this.http.post(this.authUrl + '/authenticate',
      JSON.stringify({name: username, password:password}),
      {headers: this.headers}
    )
    .map(res => res.json())
    .subscribe(info => {
      this.handleLoginResponse(info)
    }, err => {
      console.error("Failed to fetch info:", err);
    });
  }

  fetchUserInfo() {
    var headers = new Headers({'Content-Type': 'application/json', "authorization":this.token});

    if (this.token != null) {
      this.http.get(this.authUrl + '/users/memberinfo', {headers: headers})
      .map(res => res.json())
      .subscribe(info => {
        this.self = info.user
      });
    }
  }

  handleSignupResponse(info, username, password) {
    if (info.success == true) {
      this.doLogin(username, password);
    }
  }

  handleLoginResponse(info) {
    if (info.success==true) {

      this.authenticated = true;
      this.token = info.token;
      this.fetchUserInfo();
      this.emitAuthStatus(true);
    } else {
      this.emitAuthStatus(false);
    }
  }

  getSession() {
    return {'token': this.token};
  }

  private emitAuthStatus(success: boolean) {
    this.emitAuthStatusError(success, null);
  }

  private emitAuthStatusError(success: boolean, error: any) {
    this.locationWatcher.emit(
      {
        success: success,
        authenticated: this.authenticated,
        token: this.token,
        error: error
      }
    );
  }

  doLogout() {
    this.authenticated = false;
    this.token = null;
    this.self = null;
    this.emitAuthStatus(true);
    this.headers = new Headers({'Content-Type': 'application/json'});
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
