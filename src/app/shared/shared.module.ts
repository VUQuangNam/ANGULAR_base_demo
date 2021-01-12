import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./components/header/header.component";
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { UserComponent } from "./components/user/user.component";

@NgModule({
    declarations: [
        MenuBarComponent,
        HeaderComponent,
        UserComponent,
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ReactiveFormsModule,
        HttpClientModule,
        MenuBarComponent,
        HeaderComponent,
        UserComponent,
        FormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [],
})
export class SharedModule { }
