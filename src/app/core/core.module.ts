import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./compoents/footer/footer.component";
import {HeaderComponent} from "./compoents/header/header.component";
import {PageNotFoundComponent} from "./compoents/page-not-found/page-not-found.component";
import {NavComponent} from "./compoents/nav/nav.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    NavComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    NavComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
