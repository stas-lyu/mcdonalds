import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category } from '../../shared/classes/category';
import { AdminDialogComponent } from '../categories-edit-dialog/admin-dialog.component';
import { CategoriesService } from '../../core/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { Dish } from '../../shared/classes/dish';
import { DishesEditDialogComponent } from '../dishes-edit-dialog/dishes-edit-dialog.component';
import { map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
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
  categoryAddGroup: any;
  dishAddGroup: any;

  dishNameFormControl = new FormControl('', [
    Validators.required,
    Validators.min(3),
  ]);
  categorySelectFormControl = new FormControl('Beverages');

  constructor(
    private categoryService: CategoriesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _ngZone: NgZone
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
    this.categoryAddGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      imgUrl: [null, [Validators.required, Validators.minLength(3)]],
    });

    this.dishAddGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      imgUrl: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required]],
      cal: [null, [Validators.required]],
    });
  }

  public categoryNameInputHandler() {
    this.categoryAddIsDisabled = !this.categoryAddGroup.valid;
  }

  public addCategory(event: any) {
    event.preventDefault();
    this.toggleAddCategoryClass = false;
    this.categoryService
      .addCategory(this.categoryAddGroup.value)
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

  addDish() {
    if (this.dishAddGroup.valid) {
      this.dishAddGroup.value.categoryId = this.categoryId;
      this.categoryService
        .addDish(this.dishAddGroup.value)
        .pipe((this.toggleAddDishesClass = false), takeUntil(this.notifier))
        .subscribe((dishes: any) => (this.dishes = dishes));
    }
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
