import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../core/services/categories.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-dishes-edit-dialog',
  templateUrl: './dishes-edit-dialog.component.html',
  styleUrls: ['./dishes-edit-dialog.component.scss'],
})
export class DishesEditDialogComponent implements OnInit {
  public dish = this.data;
  public dishForm: any;

  constructor(
    public dialogRef: MatDialogRef<DishesEditDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public categoryService: CategoriesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dish = this.data;
    this.dishForm = this.formBuilder.group({
      name: [this.dish.name, [Validators.required]],
      price: [this.dish.price, [Validators.required]],
      description: [this.dish.description, [Validators.required]],
    });
  }

  public editDish() {
    this.data.name = this.dishForm.value.name;
    this.data.price = this.dishForm.value.price;
    this.data.description = this.dishForm.value.description;
    this.categoryService.editDish(this.data).subscribe(() => {
      this.dialogRef.close('Successfully add to cart');
    });
  }
}
