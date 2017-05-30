import { Directive } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Directive({
  selector: '[protected]'
})

export class ProtectedDirective {
  private sub : any;

  constructor(private authService : AuthService, private location: Location,  private router: Router) {
    if (!this.authService.isAuthenticated()) {
      this.location.replaceState('/');
      this.router.navigate(['/login']);
    }

    this.sub = this.authService.subscribe((val) => {
      if (!val.authenticated) {
        this.location.replaceState('/');
        this.router.navigate(['/login']); // tells them they've been logged out (somehow)
      }
    });
  }
}
