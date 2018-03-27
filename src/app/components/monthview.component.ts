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
    private proxyUrl = "https://cors-anywhere.herokuapp.com/";
    public currentMonth: Month;
    public currentYear: number;
    public round: boolean = true;

    private headers = new Headers();

    constructor(private http: Http) { }

    ngOnInit(): void {
        this.currentMonth = new Month(new Date().getMonth() + 1);
        this.currentYear = new Date().getFullYear();
        console.log("Current Month: " + this.currentMonth.id);
        console.log("Current Year: " + this.currentYear);
        if (this.user != undefined && this.user.wid != undefined && this.user.api_token != undefined) {
            this.headers.append('Content-Type', 'application/json');
            this.headers.append('Authorization', ('Basic ' + btoa(this.user.api_token + ':' + 'api_token')));

            this.getProjectData()
                .then(projects => this.user.projects = projects)
                .then(() => this.processProjectData());
        }
    }

    getProjectData(): Promise<Project[]> {
        return this.http.get(this.proxyUrl + "https://www.toggl.com/api/v8/workspaces/" + this.user.wid + "/projects", { headers: this.headers })
            .toPromise()
            .then(response => response.json() as Project[])
            .catch(this.handleError);
    }

    getTimeData(): Promise<TimeEntry[]> {
        return this.http.get(this.proxyUrl + "https://www.toggl.com/api/v8/time_entries?start_date=" + this.getStartDateString() + "T00%3A00%3A00%2B00%3A00&end_date=" + this.getEndDateString() + "T00%3A00%3A00%2B00%3A00", { headers: this.headers })
            .toPromise()
            .then(response => response.json() as TimeEntry[])
            .catch(this.handleError);
    }

    getStartDateString(): string{
        return this.currentYear + "-" + this.currentMonth.getFullId() + "-01";
    }

    getEndDateString(): string {
        if(this.currentMonth.id == 12)
        {
            return (this.currentYear + 1) + "-" + "01" + "-01";
        }
        else
        {
            let nextMonth = new Month(this.currentMonth.id + 1);
            return this.currentYear + "-" + nextMonth.getFullId() + "-01";
        }
    }

    processProjectData(): void {
        if (this.user.projects.length > 0) {
            for (let project of this.user.projects) {
                this.currentMonth.projects.push(new ProjectMonth(project.id, project.name, project.hex_color, this.currentMonth.numberOfDays));
            }
        }
        this.getTimeData()
            .then(timeEntries => this.user.timeEntries = timeEntries)
            .then(() => this.processTimeData());
    }

    processTimeData(): void {
        for (let timeEntry of this.user.timeEntries) {
            //Don't count negative, still running timers
            //Only count time entries in this month
            if (timeEntry.duration > 0 && +timeEntry.start.substring(5, 7) == this.currentMonth.id) {
                let durationHours: number = timeEntry.duration / 60 / 60;
                let dayOfMonth: number = +timeEntry.start.substring(8, 10);
                let projectId: number = timeEntry.pid;

                //Loop through ProjectMonths to find which bucket is appropriate
                for (let project of this.currentMonth.projects) {
                    if (project.id === projectId) {
                        project.days[dayOfMonth - 1].hours += durationHours;
                    }
                }
            }
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    filterEmptyProjects(): ProjectMonth[] {
        return this.currentMonth.projects.filter(x => x.getTotalHours() > 0);
    }

    getDayTotal(day: number): number {
        let total: number = 0;
        for (let project of this.currentMonth.projects) {
            total = total + project.days[day - 1].hours;
        }
        if(this.round)
        {
            total = this.getHoursRounded(total);
        }
        return total;
    }

    getMonthTotal(): number {
        let total: number = 0;
        for (let project of this.currentMonth.projects) {
            total = total + project.getTotalHours();
        }
        if(this.round)
        {
            total = this.getHoursRounded(total);
        }
        return total;
    }

    //TODO Put this somewhere that ProjectMonth and ProjectDay can use too
    getHoursRounded(hours: number): number {
        hours = hours * 60 * 60; //Convert hours to seconds
        hours = Math.round(hours / 900); //900 seconds in a 15-minute period
        hours = hours / 4; //4 15-minute periods in an hour
        return hours;
    }

}