import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../core/services/categories.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IDishesState } from '../../categories/store/state/dishes.state';
import * as Actions from '../../categories/store/actions/dishes.actions';
import { Subscription } from 'rxjs';
import { selectedDishes } from '../../categories/store/selectors/dishes.selectors';

@Component({
  selector: 'app-dishes-edit-dialog',
  templateUrl: './dishes-edit-dialog.component.html',
  styleUrls: ['./dishes-edit-dialog.component.scss'],
})
export class DishesEditDialogComponent implements OnInit {
  public dish = this.data;
  public dishForm: any;
  storeSub: Object = Subscription;

  constructor(
    public dialogRef: MatDialogRef<DishesEditDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public categoryService: CategoriesService,
    private formBuilder: FormBuilder,
    private store: Store<IDishesState>
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
    this.store.dispatch(
      new Actions.UpdateDish({ ...this.data, ...this.dishForm.getRawValue() })
    );
    this.storeSub = this.store
      .select(selectedDishes)
      .subscribe(() => this.dialogRef.close('Successfully edit dish'));
  }
}
