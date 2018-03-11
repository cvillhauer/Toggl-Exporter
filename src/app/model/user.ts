import { TimeEntry } from './timeentry';
import { Project } from './project';

export class User {
    id: number;
    api_token: string;
    fullname: string;
    image_url: string;
    workspaces: Workspace[];
    wid: number; //workspace id
    projects: Project[];
    timeEntries: TimeEntry[];
}

export class Workspace {
    id: number;
}