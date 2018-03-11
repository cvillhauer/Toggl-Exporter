import { Project } from './project';

export class TimeEntry {
    id: number;
    description: string;
    start: string; //ISO 8601 date and time
    stop: string; //ISO 8601 date and time
    duration: number; //In seconds - negative if timer is still running
    pid: number; //Project Id
    project: Project;
}