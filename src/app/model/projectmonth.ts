import { ProjectDay } from './projectday';
import { Project } from './project';

export class ProjectMonth {
    id: number;             //Project Id
    description: string;    //Project description
    color: string;          //Hex code for the color
    days: ProjectDay[];     //Array of project hours per day

    constructor(id: number, description: string, color: string, numberOfDays: number) {
        this.id = id;
        this.description = description;
        this.color = color;
        this.days = [];

        for (let i: number = 1; i <= numberOfDays; i++) {
            this.days.push(new ProjectDay(i, 0));
        }
    }

    getTotalHours(): number {
        let total: number = 0;
        for (let day of this.days) {
            total += day.hours;
        }
        return total;
    }
}