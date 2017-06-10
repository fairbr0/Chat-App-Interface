import { Component, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Group } from '../models/group';
import { Message } from '../models/message';
import { GroupService } from '../services/groups.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { USERS } from '../data/mock-users';

@Component({
  selector: 'chat-window',
  templateUrl: '../templates/chat-window.component.html',
  styleUrls: ['../css/chat-window.component.css']
})

export class ChatWindowComponent {
  @Input() group : Group;
  @ViewChild('scrollMessages') private scrollContainer: ElementRef;
  @ViewChild('titleArea') private titleContainer: ElementRef;
  dynamicHeight = 0;
  dynamicTextAreaWidth = 0;
  typedMessage : String = '';
  searchValue : String = '';
  searchMatches : User[] = [];

  @Output() onNewGroup = new EventEmitter<boolean>();

  constructor(
    private groupService : GroupService,
    private authService : AuthService
  ) {}

  isFromSelf(message: Message) {
    return (message.from === this.authService.getUserInfo().id);
  }

  getColor(message: Message) {
    if (message.from == this.authService.getUserInfo().id) {
      return '#EEE'
    }
    return this.group.color;
  }

  setMessageAreaHeight() {
    var remove = 100;


    remove += this.searchMatches.length * 45;
    if (this.searchMatches.length > 0) {
      remove -= 8;
    }
    if (this.group.groupId == null){
      console.log('making new groups');
      if (this.group.users != null) {
        remove += this.group.users.length * 28;
      }
    }
    this.dynamicHeight = window.innerHeight - remove;
  }

  setTextAreaWidth() {
    this.dynamicTextAreaWidth = window.innerWidth-330;
  }

  setMatches(users : User[]) : void {
    this.searchMatches = users;
    console.log(users);
    this.setMessageAreaHeight();
  }

  searchRecipients() : void {
    this.groupService.searchUsers(this.searchValue).then(users => this.setMatches(users));
  }

  addRecipient(user: User) : void {
    if (this.group.users == null) {
      this.group.users = [];
    }
    this.group.users.push(user);
    this.searchValue = '';
    this.searchMatches = [];
    this.setMessageAreaHeight();
  }

  removeRecipient(user : User) : void {
    var index = this.group.users.indexOf(user);
    this.group.users.splice(index, 1);
    this.setMessageAreaHeight();
  }

  ngOnInit() {
    this.setMessageAreaHeight();
    this.setTextAreaWidth();
    this.scrollToBottom();
  }

  scrollToBottom() : void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) {

    }
  }

  sendMessage() : void {
    if (this.typedMessage !== '') {

      var message : Message = {
        from : this.authService.getUserInfo().id,
        content : this.typedMessage
      }

      if (this.group.groupId == null) {
        this.group.messages = [];
        this.group.color = 'green';
        this.group.users.unshift(this.authService.getUserInfo());
      }

      this.typedMessage = '';
      //send message through sockets
      this.group.messages.push(message);

      if(this.group.groupId == null) {
        this.onNewGroup.emit(true);
        this.setMessageAreaHeight();
      }
    }
  }

  onKey(keycode) : void {
    if (keycode === 13 && this.typedMessage !== '') {
      this.sendMessage();
      this.typedMessage = '';
    }
  }

}
