import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Category } from '../../shared/classes/category';
import { AdminDialogComponent } from '../categories-edit-dialog/admin-dialog.component';
import { CategoriesService } from '../../core/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { Dish } from '../../shared/classes/dish';
import { DishesEditDialogComponent } from '../dishes-edit-dialog/dishes-edit-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
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
  nameFormControl = new FormControl('', [Validators.required]);
  categorySelectFormControl = new FormControl('');

  constructor(
    private categoryService: CategoriesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getCategories();
      this.categoryService
        .getDishesByCategoryId(this.categoryId)
        .pipe(takeUntil(this.notifier))
        .subscribe((dishes) => (this.dishes = dishes));
    }, 1000);
  }

  public openSnackBar(message: string, action: string): void {
    this._snackBar
      .open(message, action, { duration: 3000 })
      .onAction()
      .subscribe();
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe((category) => {
      this.categories = category;
    });
  }

  public addCategory() {
    const category = {
      name: this.nameFormControl.value,
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

  selectOnChange(category: string) {
    this.categoryId = this.categories.findIndex((item: Category) => {
      return item.name === category;
    });
    this.categoryService
      .getDishesByCategoryId(this.categoryId)
      .pipe(takeUntil(this.notifier))
      .subscribe((dishes) => (this.dishes = dishes));
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
