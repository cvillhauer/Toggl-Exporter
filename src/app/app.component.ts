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
  public currentMonth: Month;

  onAuthenticated(newUser: User) {
    this.currentUser = newUser;

    //TODO: Get data from the user
    this.currentMonth = new Month(3);
    let fakeProject1Days: ProjectDay[] = [{ date: 1, hours: 5 }, { date: 2, hours: 5 }, { date: 3, hours: 5 }, { date: 4, hours: 5 }, { date: 5, hours: 5 }];
    let fakeProject2Days: ProjectDay[] = [{ date: 1, hours: 10 }, { date: 2, hours: 10 }, { date: 3, hours: 10 }, { date: 4, hours: 10 }, { date: 5, hours: 10 }];
    let fakeProject3Days: ProjectDay[] = [{ date: 1, hours: 15 }, { date: 2, hours: 15 }, { date: 3, hours: 15 }, { date: 4, hours: 15 }, { date: 5, hours: 15 }];
    let fakeProject1Month: ProjectMonth = new ProjectMonth("Fake Project 1", "#FF0000");
    fakeProject1Month.days = fakeProject1Days;
    let fakeProject2Month: ProjectMonth = new ProjectMonth("Fake Project 2", "#00FF00");
    fakeProject2Month.days = fakeProject2Days;
    let fakeProject3Month: ProjectMonth = new ProjectMonth("Fake Project 3", "#0000FF");
    fakeProject3Month.days = fakeProject3Days;
    this.currentMonth.projects.push(fakeProject1Month);
    this.currentMonth.projects.push(fakeProject2Month);
    this.currentMonth.projects.push(fakeProject3Month);
  }
}