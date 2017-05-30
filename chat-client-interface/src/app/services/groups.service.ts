import { Injectable } from '@angular/core';

import { Group } from '../models/group';
import { User } from '../models/user';
import { GROUPS } from '../data/mock-groups';
import { USERS } from '../data/mock-users';

@Injectable()
export class GroupService {

  getGroups() : Promise<Group[]> {
    return Promise.resolve(GROUPS)
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
    var matches : User[] = [];
    for (var i = 0; i < USERS.length; i++) {
      if (USERS[i].name.toLowerCase().indexOf(name.toLowerCase()) === 0) {
        matches.push(USERS[i]);
      }
    }
    return Promise.resolve(matches);
  }
}
