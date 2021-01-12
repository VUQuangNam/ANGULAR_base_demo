import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { TabMenuService } from '../shared/services/tabMenu.service';

@Component({
    selector: 'app-pages',
    styleUrls: ['pages.component.scss'],
    template: `
    <div class="d-flex">
        <div class="menuLeft"><app-menu-bar></app-menu-bar></div>
        <div class="main">
        <app-tab-row-menu *ngIf="checked" [patientId]="patientId"></app-tab-row-menu>
        <router-outlet></router-outlet>
        </div>
        <app-notifications></app-notifications>
    </div>
    `
})

export class PagesComponent implements OnInit {
    checked = false;
    patientId;
    constructor(
        private router: Router,
        private tabService: TabMenuService
    ) {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            distinctUntilChanged(),
        ).subscribe((res: any) => {
            const data = res.url.split('/');
            this.tabService.changeMessage(data[4]);
            if (data.length > 3 && data.includes('detail') && data[4] != 'invoice') {
                const value = {
                    id: data[4],
                    href: data[5]
                }
                const listRoute = JSON.parse(localStorage.getItem('router'));
                if (!listRoute) {
                    let listRouteSub = [];
                    listRouteSub.push(value)
                    localStorage.setItem('router', JSON.stringify(listRouteSub));
                } else {
                    const index = listRoute.findIndex(x => x.id == value.id);
                    if (index > -1) {
                        listRoute[index] = value;
                        localStorage.setItem('router', JSON.stringify(listRoute));
                    } else {
                        listRoute.push(value);
                        localStorage.setItem('router', JSON.stringify(listRoute));
                    }
                }

                return this.checked = true,
                    this.patientId = data[4];
            }
            return this.checked = false;
        });
    }

    ngOnInit() {
        const data = window.location.href.split('/');
        if (data.length > 6 && data.includes('detail'))
            return this.checked = true,
                this.patientId = data[data.length - 2];
        return this.checked = false;
    }

}