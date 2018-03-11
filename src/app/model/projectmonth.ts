import { ProjectDay } from './projectday';

export class ProjectMonth {
    description: string;    //Project description
    color: string;          //Hex code for the color
    days: ProjectDay[];     //Array of project hours per day

    constructor(description: string, color: string) {
        this.description = description;
        this.color = color;
    }
}