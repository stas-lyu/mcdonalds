import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { FileUploadComponent } from '../core/compoents/file-upload/file-upload.component';
import { DishesEditDialogComponent } from './dishes-edit-dialog/dishes-edit-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDialogComponent,
    FileUploadComponent,
    DishesEditDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
