import { Component, Input } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from '../model/user';
import { Project } from '../model/project';
import { Month } from '../model/month';
import { ProjectMonth } from '../model/projectmonth';
import { ProjectDay } from '../model/projectday';

import 'rxjs/add/operator/toPromise';
import { TimeEntry } from '../model/timeentry';

@Component({
    selector: 'monthview',
    templateUrl: './monthview.component.html',
})

export class MonthViewComponent {
    @Input() user: User;
    public currentMonth: Month;

    private headers = new Headers();

    constructor(private http: Http) { }

    ngOnInit(): void {
        this.currentMonth = new Month(2);

        if(this.user != undefined && this.user.wid != undefined && this.user.api_token != undefined)
        {
            this.getProjectData()
            .then(projects => this.user.projects = projects)
            .then(() => this.processProjectData());
            
            this.getTimeData()
            .then(timeEntries => this.user.timeEntries = timeEntries)
            .then(() => this.processTimeData());
        }
    }

    getProjectData(): Promise<Project[]> {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', ('Basic ' + btoa(this.user.api_token + ':' + 'api_token')));
        return this.http.get("https://www.toggl.com/api/v8/workspaces/" + this.user.wid + "/projects", { headers: this.headers })
            .toPromise()
            .then(response => response.json() as Project[])
            .catch(this.handleError);
    }

    getTimeData(): Promise<TimeEntry[]> {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', ('Basic ' + btoa(this.user.api_token + ':' + 'api_token')));
        return this.http.get("https://www.toggl.com/api/v8/time_entries?start_date=2018-02-01T00%3A00%3A00%2B00%3A00&end_date=2018-03-01T00%3A00%3A00%2B00%3A00", { headers: this.headers })
            .toPromise()
            .then(response => response.json() as TimeEntry[])
            .catch(this.handleError);
    }

    processProjectData(): void {
        if (this.user.projects.length > 0) {
            for (let project of this.user.projects) {
                this.currentMonth.projects.push(new ProjectMonth(project.name, project.hex_color));
            }



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

    processTimeData(): void {
        console.log(this.user.timeEntries);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}