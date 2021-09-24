import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./compoents/footer/footer.component";
import {HeaderComponent} from "./compoents/header/header.component";
import {PageNotFoundComponent} from "./compoents/page-not-found/page-not-found.component";
import {NavComponent} from "./compoents/nav/nav.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {CartComponent} from "./compoents/cart/cart.component";
import {CategoriesModule} from "../categories/categories.module";

@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    NavComponent,
    FooterComponent,
    CartComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        CategoriesModule,
    ],
  exports: [
    NavComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }