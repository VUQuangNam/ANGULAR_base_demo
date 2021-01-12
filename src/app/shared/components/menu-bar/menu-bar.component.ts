import { Component, OnInit } from '@angular/core';
import { TabMenuService } from "../../services/tabMenu.service";
import { ViewAllClientService } from '../../services/viewAllClient.service';
import { PatientService } from './patient.service';

@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss'],

})
export class MenuBarComponent implements OnInit {

    constructor(
        public data: TabMenuService,
        public viewClientService: ViewAllClientService,
        public patientService: PatientService,

    ) { }
    showButton: boolean = false;
    isShow: boolean = false;
    patientId: number;
    hideMenu: boolean = false;
    showArrow: boolean;

    ngOnInit() {
        this.data.currentMessage.subscribe(res => {
            this.patientId = res;
            if (this.patientId) {
                this.patientService.getDetailPatient(this.patientId).subscribe(res => {
                    if (res.VisitId) {
                        this.isShow = true;
                    } else {
                        this.isShow = false;
                    }
                })
            } else {
                this.isShow = false;
            }
        });
        this.data.hideMenuValue.subscribe(res => {
            this.hideMenu = res;
        });
    }

    showMenu() {
        this.isShow = !this.isShow;
    }
    clickClientMenu() {
        this.viewClientService.showClient(false);
        this.viewClientService.showOpenClientAll(true);
        this.viewClientService.showRecentClient(true);
    }

}
