import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: '../templates/login.component.html',
  styleUrls: ['../css/login.component.css']
})

export class LoginComponent {
  title = 'PandaChat';
  username : String;
  password : String;
  newUsername : String;
  newPassword : String;
  confirmPassword : String;

  constructor(
    private authService : AuthService,
    private router: Router
  ) {
      if (authService.isAuthenticated()) {
        this.router.navigate(['/chat']);
      }
    }

  tryLogin() : void {
    var result = this.authService.doLogin(this.username, this.password);
    if (result) {
      this.router.navigate(['/chat']);
    }
  }
}
