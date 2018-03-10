import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from '../model/user';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'authenticate',
    templateUrl: './authenticate.component.html',
})

export class AuthenticateComponent {

    private headers = new Headers();

    //You can log in with either username/password or apikey/api_token
    //Put your own Toggl api key here for testing
    private email = '';
    private password = 'api_token';

    public user: User;

    constructor(private http: Http) { }

    ngOnInit(): void {
        
    }

    authenticate(): void {
        this.getUserData().then(user => this.user = user);
    }

    getUserData(): Promise<User> {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', ('Basic ' + btoa(this.email + ':' + this.password)));
        return this.http.get("https://www.toggl.com/api/v8/me", { headers: this.headers })
            .toPromise()
            .then(response => response.json().data as User)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}