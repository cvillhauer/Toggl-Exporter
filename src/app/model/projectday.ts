export class ProjectDay {
    date: number;   //Number for the day of the month
    hours: number;  //Number of hours spent on that day on this project

    constructor(date: number, hours: number) {
        this.date = date;
        this.hours = hours;
    }
}