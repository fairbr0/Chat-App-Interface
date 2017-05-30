import { Component } from '@angular/core';
import { Group } from '../models/group';
import { GroupService } from '../services/groups.service';
import { User } from '../models/user';
import { USERS } from '../data/mock-users';
import { SettingsDropDown } from './settings-drop-down.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'chat-browser',
  templateUrl: '../templates/chat-browser.component.html',
  styleUrls: ['../css/chat-browser.component.css']
})

export class ChatBrowserComponent{

  title: 'PandaChat - Chat';
  activeGroups : Group[];
  activeGroupsCopy : Group[];
  selectedGroup : Group = new Group;
  dynamicWidth = 0;
  searchValue = '';

  constructor(
    private groupService : GroupService,
    private authService : AuthService
  ) {}

  processGroups(groups : Group[]) : void {
    for (var i = 0; i < groups.length; i++ ) {
      if (groups[i].name === '') {
        groups[i] = this.setGroupName(groups[i]);
      }
    }

    this.activeGroups = groups;
    this.activeGroupsCopy = this.activeGroups;
  }

  appendNewGroup(group : Group) : void {
    group = this.setGroupName(group);
    this.activeGroups.unshift(group);
    this.activeGroupsCopy = this.activeGroups;
    this.selectedGroup = group;
    console.log('added new group');
  }

  setGroupName(group: Group) : Group {
    var users : User[] = group.users;
    var names : String[] = [];

    for (var j = 0; j < users.length; j++) {
      var user = users[j];
      if (user.id !== this.authService.getUserInfo().id) {
        names.push(user.name);
      }
    }

    group.name = names.toString();
    return group;
  }

  equalUsers(a:User[], b:User[]) : boolean {
    for (var i = 0; i < a.length; i++) {
      var flag = false;
      for (var j = 0; j < b.length; j++) {
        if (a[i].id === b[j].id) {
          flag = true;
        }
      }
      if (!flag) {
        return false;
      }
    }

    for (var i = 0; i < b.length; i++) {
      var flag = false;
      for (var j = 0; j < a.length; j++) {
        if (a[j].id === b[i].id) {
          flag = true;
        }
      }
      if (!flag) {
        return false;
      }
    }
    return true;
  }

  onNewGroup(created) {
    console.log('here');
    //new group must be created/checked for existance
    for (var j=0; j < this.activeGroups.length; j++) {
      var group = this.activeGroups[j];
      if (this.equalUsers(group.users,this.selectedGroup.users)) {

        this.activeGroups[j].messages = group.messages.concat(this.selectedGroup.messages)
        this.selectedGroup = this.activeGroups[j];
        return;
      }
    }

    //could not merge: create new group
    this.groupService.newGroup(this.selectedGroup).then(group => this.appendNewGroup(group));
  }

  getGroups() : void {
    this.groupService.getGroups().then(groups => this.processGroups(groups));
  }

  setChatWidth() {
    this.dynamicWidth = window.innerWidth - 250;

  }

  ngOnInit() : void {
    this.getGroups();
    this.setChatWidth();
  }

  onSelect(group : Group) : void {
    this.selectedGroup = group;
    this.activeGroups = this.activeGroupsCopy;
  }

  newMessage() : void {
    this.selectedGroup = new Group;
    this.activeGroups = this.activeGroupsCopy;
  }

  searchChats() : void {
    var newGroups = [];
    if (this.searchValue === '') {
      this.activeGroups = this.activeGroupsCopy;
      return;
    }
    for (var i = 0; i < this.activeGroupsCopy.length; i++) {
      var name = this.activeGroupsCopy[i].name.toLowerCase();
      console.log(name);
      if (name.indexOf(this.searchValue.toLowerCase()) === 0) {
        newGroups.push(this.activeGroupsCopy[i])
      }
    }
    this.activeGroups = newGroups;
  }

}
