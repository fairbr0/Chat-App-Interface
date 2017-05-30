import { Component } from '@angular/core';

@Component({
  selector: 'setting-drop-down',
  template: `<span dropdown (isOpenChange)="toggled($event)">
    <a dropdownToggle (click)="false" class='menu-button'><span class="glyphicon glyphicon-cog menu-button " ></span></a>
    <ul *dropdownMenu class="dropdown-menu">
      <li >
        <a class="dropdown-item" routerLink='/login'>Logout</a>
      </li>
    </ul>
    </span>`,
  styles: ['.menu-button:hover {color:red;}', '.menu-button {color:black;}']
})

export class SettingsDropDown {
  public items:string[] = [''];

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }
}
