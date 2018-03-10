import { TimeEntry } from './timeentry';
import { Project } from './project';

export class User {
    id: number;
    api_token: string;
    fullname: string;
    image_url: string;
    wid: number; //workspace id
    projects: Project[];
    timeEntries: TimeEntry[];
}