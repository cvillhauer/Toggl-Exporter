import { Component } from '@angular/core';

import { User } from './model/user';
import { Project } from './model/project';
import { TimeEntry } from './model/timeentry';
import { Month } from './model/month';
import { ProjectDay } from './model/projectday';
import { ProjectMonth } from './model/projectmonth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentUser: User = new User();

  onAuthenticated(newUser: User) {
    this.currentUser = newUser;
    if(this.currentUser.workspaces.length > 0)
    {
      this.currentUser.wid = this.currentUser.workspaces[0].id;
    }
  }
}