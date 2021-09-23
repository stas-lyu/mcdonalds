import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../shared/material.module";
import {CategoryDialogComponent} from "./category-item-dialog/category-dialog.component";
import {AppRoutingModule} from "../app-routing.module";
import {DishesListComponent} from "./dishes-list/dishes-list.component";
import {SelectQuantityComponent} from "./category-item-dialog/select-quantity/select-quantity.component";

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryDialogComponent,
    DishesListComponent,
    SelectQuantityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
  ]
})
export class CategoriesModule { }
