import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../shared/material.module";



@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ]
})
export class CategoriesModule { }
