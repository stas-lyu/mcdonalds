import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class CategoryModule { }
