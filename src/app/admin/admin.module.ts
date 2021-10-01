import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDialogComponent } from './categories-edit-dialog/admin-dialog.component';
import { FileUploadComponent } from '../core/compoents/file-upload/file-upload.component';
import { DishesEditDialogComponent } from './dishes-edit-dialog/dishes-edit-dialog.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDialogComponent,
    FileUploadComponent,
    DishesEditDialogComponent,
    OrdersComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
