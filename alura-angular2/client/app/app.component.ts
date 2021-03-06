import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    photos: Object[] = [];

    constructor(http: Http) {
        http.get('v1/fotos')
            .map(res => res.json())
            .subscribe(photos => this.photos = photos,
            err => console.error(err));
    }
}
