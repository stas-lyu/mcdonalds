import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDialogComponent } from './categories-edit-dialog/admin-dialog.component';
import { FileUploadComponent } from '../core/compoents/file-upload/file-upload.component';
import { DishesEditDialogComponent } from './dishes-edit-dialog/dishes-edit-dialog.component';
import { OrdersComponent } from './orders/orders.component';
import { StoreModule } from '@ngrx/store';
import { categoriesReducer } from '../categories/store/reducers/categories.reducer';
import { dishesReducer } from '../categories/store/reducers/dishes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from '../categories/store/effects/categories.effects';
import { DishesEffects } from '../categories/store/effects/dishes.effects';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDialogComponent,
    FileUploadComponent,
    DishesEditDialogComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('categories', categoriesReducer),
    StoreModule.forFeature('dishes', dishesReducer),
    EffectsModule.forFeature([CategoriesEffects, DishesEffects]),
  ],
})
export class AdminModule {}
