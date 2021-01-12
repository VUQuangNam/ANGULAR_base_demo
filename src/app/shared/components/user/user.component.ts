import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { ProviderService } from 'src/app/pages/home/services/provider.service';
import { AlertService } from "../../services/alert.service";
import { TabMenuService } from "../../services/tabMenu.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    constructor(
        public hideMenu: TabMenuService,
        public router: Router,
        public alertService: AlertService,
        public providerService: ProviderService,
        public translate: TranslateService
    ) { }

    name: string;
    position: string;
    currentProfile: any;
    language: string = 'en';

    ngOnInit(): void {
        this.position = JSON.parse(localStorage.getItem('Position')).Position;
        this.getProvider();
    }

    getProvider() {
        this.providerService.getProfileProvider().subscribe(res => {
            this.currentProfile = res;
        });
    }

    onChangeLanguage = (value) => {
        this.language = value;
        this.translate.use(value);
        localStorage.setItem('translate', value);
    }

    switchLang(lang: string) {
        this.language = lang;
        this.translate.use(lang);
        localStorage.setItem('translate', lang);
    }

    profileDetail() {
        this.hideMenu.sentHideMenuValue(true);
        this.router.navigateByUrl('/pages/home/doctor')
    }

    logout() {
        if (confirm("Bạn có muốn đăng xuất không?")) {
            localStorage.clear();
            setTimeout(() => {
                this.router.navigateByUrl('/login');
            }, 1000);
        } else {
            console.log('logout')
        }
    }
}
