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
  private sub: any = null;

  constructor(
    private authService : AuthService,
    private router: Router
  ) {
      if (authService.isAuthenticated()) {
        this.router.navigate(['/chat']);
      }

      this.sub = this.authService.subscribe((val) => {
        if (val.authenticated) {
          this.router.navigate(['/chat']);
        }
      })
    }

  tryLogin() : void {
    this.authService.doLogin(this.username, this.password);
  }

  trySignUp() : void {
    if (this.newPassword === this.confirmPassword) {
      this.authService.doSignUp(this.newUsername, this.newPassword)
    } 
  }
}
