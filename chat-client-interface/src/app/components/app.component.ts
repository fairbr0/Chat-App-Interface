import { Component } from '@angular/core';
import { User } from '../models/user';
import { USERS } from '../data/mock-users';

@Component({
  selector: 'app',
  templateUrl: '../templates/app.component.html',
  styleUrls: ['../css/app.component.css']
})
export class AppComponent {
  title = 'Panda Chat';
}
