import { Component } from '@angular/core';

import { User } from './model/user';
import { Project } from './model/project';
import { TimeEntry } from './model/timeentry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentUser: User = new User();

  onAuthenticated(newUser: User) {
    this.currentUser = newUser;
  }
}