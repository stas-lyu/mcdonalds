import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Category } from '../../shared/classes/category';
import { AdminDialogComponent } from '../categories-edit-dialog/admin-dialog.component';
import { CategoriesService } from '../../core/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { Dish } from '../../shared/classes/dish';
import { DishesEditDialogComponent } from '../dishes-edit-dialog/dishes-edit-dialog.component';
import { map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-admin',
  animations: [
    trigger('slideIn', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 })),
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' })),
      ]),
    ]),
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  categories: Category[] = [];
  dishes: Dish[] = [];
  toggleAddCategoryClass: boolean = false;
  toggleAddDishesClass: boolean = false;
  categoryId: number = 0;
  notifier = new Subject();
  categoryAddIsDisabled: boolean = true;
  dishAddIsDisabled: boolean = true;
  categoryNameFormControl = new FormControl('', [
    Validators.required,
    Validators.min(3),
  ]);
  dishNameFormControl = new FormControl('', [
    Validators.required,
    Validators.min(3),
  ]);
  categorySelectFormControl = new FormControl('Beverages');

  constructor(
    private categoryService: CategoriesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(
        tap((categories) => (this.categories = categories)),
        map((categories: Category[]) => {
          return categories[0];
        }),
        mergeMap((category) =>
          this.categoryService.getDishesByCategoryId(category.id)
        ),
        takeUntil(this.notifier)
      )
      .subscribe((dishes) => (this.dishes = dishes));
  }

  public categoryNameInputHandler() {
    this.categoryAddIsDisabled = !this.categoryNameFormControl.valid;
  }

  public openSnackBar(message: string, action: string): void {
    this._snackBar
      .open(message, action, { duration: 3000 })
      .onAction()
      .subscribe();
  }

  public addCategory(event: any) {
    event.preventDefault();
    const category = {
      name: this.categoryNameFormControl.value,
      imgUrl:
        'https://www.mcdonalds.com/is/image/content/dam/ua/nutrition/nfl-product/product/hero/DonutHeart.png?$Product_Desktop$',
    };

    this.toggleAddCategoryClass = false;
    this.categoryService
      .addCategory(category)
      .subscribe((categoriesData: any) => {
        this.categories = categoriesData.categories;
      });
  }

  public deleteCategory(categoryId: number): void {
    this.categoryService
      .deleteCategory(categoryId)
      .pipe(takeUntil(this.notifier))
      .subscribe((categoriesData: any) => {
        this.categories = categoriesData.categories;
      });
  }

  public openEditCategoryModal(category: Category): void {
    this.dialog.open(AdminDialogComponent, {
      data: category,
    });
  }

  public deleteDish(dishId: number): void {
    this.categoryService
      .deleteDish(this.categoryId, dishId)
      .pipe(takeUntil(this.notifier))
      .subscribe(() => {
        this.selectOnChange(this.categorySelectFormControl.value);
      });
  }

  public openEditDishModal(dish: Dish): void {
    this.dialog.open(DishesEditDialogComponent, {
      data: dish,
    });
  }

  public dishNameInputHandler() {
    this.dishAddIsDisabled = !this.dishNameFormControl.valid;
  }

  selectOnChange(category: string) {
    this.categoryId = this.categories.findIndex((item: Category) => {
      return item.name === category;
    });
    this.categoryService
      .getDishesByCategoryId(this.categoryId)
      .pipe(takeUntil(this.notifier))
      .subscribe((dishes) => (this.dishes = dishes));
  }

  addDish() {}

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
