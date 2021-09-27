import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {MaterialModule} from "../shared/material.module";
import {AdminCategoriesComponent} from "./admin-categories/admin-categories.component";
import {AdminDishesComponent} from "./admin-dishes/admin-dishes.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoriesComponent,
    AdminDishesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule { }
