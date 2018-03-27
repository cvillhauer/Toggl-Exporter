export class ProjectDay {
    date: number;   //Number for the day of the month
    hours: number;  //Number of hours spent on that day on this project

    constructor(date: number, hours: number) {
        this.date = date;
        this.hours = hours;
    }

    getHoursRounded(): number {
        let hours: number = this.hours * 60 * 60; //Convert hours to seconds
        hours = Math.round(hours / 900); //900 seconds in a 15-minute period
        hours = hours / 4; //4 15-minute periods in an hour
        return hours;
    }
}