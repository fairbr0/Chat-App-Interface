import { Injectable } from '@angular/core';

import { Group } from '../models/group';
import { User } from '../models/user';
import { GROUPS } from '../data/mock-groups';
import { USERS } from '../data/mock-users';
import { Http, Headers } from '@angular/http' ;
import { AuthService } from './auth.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupService {

  private url = 'http://localhost:3000/api';
  constructor( private authService: AuthService, private http: Http) {}

  getGroups() : Promise<Group[]> {
    var headers = new Headers({'Content-Type': 'application/json', "authorization":this.authService.getSession().token});
    var url = this.url + '/groups/' + this.authService.getUserInfo().id;
    return this.http.get(url, {headers: headers})
      .toPromise()
      .then(res => res.json() as Group[])
      .catch(this.handleError);
  }

  newGroup(group : Group) : Promise<Group> {
    group.groupId = '2345';
    return Promise.resolve(group);
  }

  searchUsers(name) : Promise<User[]> {
    if (name === '') {
      var empty = new Array<User>();
      return Promise.resolve(empty);
    }
    /*var matches : User[] = [];
    for (var i = 0; i < USERS.length; i++) {
      if (USERS[i].name.toLowerCase().indexOf(name.toLowerCase()) === 0) {
        matches.push(USERS[i]);
      }
    }
    return Promise.resolve(matches);*/

    var headers = new Headers({'Content-Type': 'application/json', "authorization":this.authService.getSession().token});
    var url = this.url + '/users/search/' + name;

    return this.http.get(url, {headers: headers})
      .toPromise()
      .then(res => res.json().data as User[])
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
