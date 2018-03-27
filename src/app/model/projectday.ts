export class ProjectDay {
    date: number;   //Number for the day of the month
    hours: number;  //Number of hours spent on that day on this project

    constructor(date: number, hours: number) {
        this.date = date;
        this.hours = hours;
    }

    getHoursRounded(): number {
        let hours: number = this.hours;
        let minutes = (Math.round((hours * 60)/15) * 15) % 60; //Gives me 0, 15, 30, or 45
        hours = Math.floor(hours) + (minutes/60);
        return hours;
    }
}