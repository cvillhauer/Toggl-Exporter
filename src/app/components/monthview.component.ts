import { Component, Input } from '@angular/core';

import { Month } from '../model/month';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'monthview',
    templateUrl: './monthview.component.html',
})

export class MonthViewComponent {
    @Input() month: Month;

    constructor() { }

    ngOnInit(): void {
        
    }

}