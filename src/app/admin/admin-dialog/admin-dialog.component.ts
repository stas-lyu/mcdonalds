import {Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoriesService} from "../../core/services/categories.service";
import {FormControl, Validators} from "@angular/forms";
import {Category} from "../../shared/classes/category";

@Component({
  selector: 'app-admin-edit-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss']
})

export class AdminDialogComponent implements OnInit {

  nameFormControl = new FormControl(this.data.name, [Validators.required]);
  category!: Category

  constructor(
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public categoryService: CategoriesService,) {
  }

  ngOnInit(): void {
    this.category = this.data
  }

  public addCategory(): void {
    this.dialogRef.afterClosed().subscribe(() => {
    });
    this.dialogRef.close('Successfully add to cart');
  }

  public editCategory() {
    this.data.name = this.nameFormControl.value;
    this.categoryService.editCategory(this.data).subscribe(() => {
      this.dialogRef.close('Successfully add to cart');
    })
  }
}
