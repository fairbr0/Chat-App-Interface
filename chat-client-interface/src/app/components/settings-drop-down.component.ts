import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'setting-drop-down',
  template: `<span dropdown (isOpenChange)="toggled($event)">
    <a dropdownToggle (click)="false" class='menu-button'><span class="glyphicon glyphicon-cog menu-button " ></span></a>
    <ul *dropdownMenu class="dropdown-menu">
      <li >
        <a class="dropdown-item" (click)='logout($event)'>Logout</a>
      </li>
    </ul>
    </span>`,
  styles: ['.menu-button:hover {color:red;}', '.menu-button {color:black;}']
})

export class SettingsDropDown {
  public items:string[] = [''];

  constructor(private authService: AuthService, private router: Router, private location: Location) {
  }

  public logout() : void {
    this.authService.doLogout();
    this.location.replaceState('/');
    this.router.navigate(['/login']);
  }

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }
}
