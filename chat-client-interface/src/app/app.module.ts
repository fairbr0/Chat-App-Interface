import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './components/app.component';
import { LoginComponent} from './components/login.component';
import { GroupService } from './services/groups.service';
import { ChatWindowComponent } from './components/chat-window.component';
import { ChatBrowserComponent } from './components/chat-browser.component';
import { SettingsDropDown } from './components/settings-drop-down.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatBrowserComponent,
    ChatWindowComponent,
    SettingsDropDown
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    GroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
