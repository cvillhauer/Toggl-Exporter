import { Project } from './project';

export class TimeEntry {
    id: number;
    description: string;
    start: string; //ISO 8601 date and time
    stop: string; //ISO 8601 date and time
    duration: number; //negative if timer is still running
    project: Project;
}