import { ProjectMonth } from './projectmonth';

export class Month {
    id: number;                 //1-12 month number
    name: string;               //Name of the month
    numberOfDays: number;       //Number of days in the calendar month
    dates: number[];            //Array of dates in the calendar month
    projects: ProjectMonth[];   //Array of project times for that month

    constructor(monthNumber: number) {
        this.id = monthNumber;
        this.calculateNameAndDays();
        this.projects = [];
        this.dates = [];
        for(let i=1; i <= this.numberOfDays; i++)
        {
            this.dates.push(i);
        }
    }

    calculateNameAndDays() {
        switch (this.id) {
            case 1:
                this.name = "January";
                this.numberOfDays = 31;
                break;
            case 2:
                this.name = "February";
                this.numberOfDays = 29;     //TODO: Smarter leap year handling
                break;
            case 3:
                this.name = "March";
                this.numberOfDays = 31;
                break;
            case 4:
                this.name = "April";
                this.numberOfDays = 30;
                break;
            case 5:
                this.name = "May";
                this.numberOfDays = 31;
                break;
            case 6:
                this.name = "June";
                this.numberOfDays = 30;
                break;
            case 7:
                this.name = "July";
                this.numberOfDays = 31;
                break;
            case 8:
                this.name = "August";
                this.numberOfDays = 31;
                break;
            case 9:
                this.name = "September";
                this.numberOfDays = 30;
                break;
            case 10:
                this.name = "October";
                this.numberOfDays = 31;
                break;
            case 11:
                this.name = "November";
                this.numberOfDays = 30;
                break;
            case 12:
                this.name = "December";
                this.numberOfDays = 31;
                break;
        }
    }

}