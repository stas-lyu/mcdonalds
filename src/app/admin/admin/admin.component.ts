import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from '../../shared/classes/category';
import { AdminDialogComponent } from '../categories-edit-dialog/admin-dialog.component';
import { CategoriesService } from '../../core/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { Dish } from '../../shared/classes/dish';
import { DishesEditDialogComponent } from '../dishes-edit-dialog/dishes-edit-dialog.component';
import { filter } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import * as CategoriesActions from '../../categories/store/actions/categories.actions';
import { Store } from '@ngrx/store';
import { ICategoriesState } from '../../categories/store/state/categories.state';
import * as DishesActions from '../../categories/store/actions/dishes.actions';
import { selectedCategories } from '../../categories/store/selectors/categories.selectors';
import { selectedDishes } from '../../categories/store/selectors/dishes.selectors';

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
  storeSub!: Subscription;
  categories: Category[] = [];
  dishes: Dish[] = [];
  toggleAddCategoryClass: boolean = false;
  toggleAddDishesClass: boolean = false;
  categoryId: number = 0;
  notifier = new Subject();
  categoryAddIsDisabled: boolean = true;
  categoryAddGroup!: FormGroup;
  dishAddGroup!: FormGroup;

  dishNameFormControl = new FormControl('', [
    Validators.required,
    Validators.min(3),
  ]);
  categorySelectFormControl = new FormControl('Beverages');

  constructor(
    private categoryService: CategoriesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _ngZone: NgZone,
    private storeCategories: Store<ICategoriesState>,
    private storeDishes: Store<ICategoriesState>
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    // this.loadDishes();
    this.categoryAddGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      imgUrl: [null, [Validators.required, Validators.minLength(3)]],
    });

    this.dishAddGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      categoryId: [null, [Validators.required]],
      imgUrl: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required]],
      cal: [null, [Validators.required]],
    });
  }

  public loadCategories(): void {
    this.storeCategories.dispatch(new CategoriesActions.LoadCategories());
    this.storeSub = this.storeCategories
      .select(selectedCategories)
      .pipe(filter((response) => !!response))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.storeDishes.dispatch(
          new DishesActions.LoadDishById(categories[0].id)
        );
        this.storeDishes
          .select(selectedDishes)
          .subscribe((dishes) => (this.dishes = dishes));
      });
  }

  public loadDishes(): void {
    this.storeDishes.dispatch(new DishesActions.LoadDishes());
    this.storeSub = this.storeDishes
      .select(selectedDishes)
      .subscribe((dishes: Dish[]) => {
        this.dishes = dishes;
      });
  }

  public categoryNameInputHandler(): void {
    this.categoryAddIsDisabled = !this.categoryAddGroup.valid;
  }

  public addCategory(event: any): void {
    event.preventDefault();
    this.storeCategories.dispatch(
      new CategoriesActions.AddCategory(this.categoryAddGroup.value)
    );
    this.storeSub = this.storeCategories
      .select(selectedCategories)
      .pipe(filter((response: Category[]) => !!response))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  public deleteCategory(categoryId: number): void {
    this.storeCategories.dispatch(
      new CategoriesActions.DeleteCategory(categoryId)
    );
    this.storeSub = this.storeCategories
      .select(selectedCategories)
      .pipe(filter((response: Category[]) => !!response))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  public openEditCategoryModal(category: Category): void {
    this.dialog.open(AdminDialogComponent, {
      data: category,
    });
  }

  public deleteDish(dishId: number): void {
    this.storeDishes.dispatch(new DishesActions.DeleteDishById(dishId));
    this.storeSub = this.storeDishes
      .select(selectedDishes)
      .pipe(filter((response: Dish[]) => !!response))
      .subscribe((dishes: Dish[]) => {
        this.dishes = dishes;
      });
  }

  public openEditDishModal(dish: Dish): void {
    this.dialog.open(DishesEditDialogComponent, {
      data: dish,
    });
  }

  selectOnChange(category: string): void {
    this.categoryId = this.categories.findIndex((item: Category) => {
      return item.name === category;
    });
    this.storeDishes.dispatch(new DishesActions.LoadDishById(this.categoryId));
    this.storeSub = this.storeDishes
      .select(selectedDishes)
      .pipe(filter((response: Dish[]) => !!response))
      .subscribe((dishes: Dish[]) => {
        this.dishes = dishes;
      });
  }

  addDish(event: any): void {
    event.preventDefault();
    if (this.dishAddGroup.valid) {
      this.toggleAddDishesClass = false;
      this.storeDishes.dispatch(
        new DishesActions.AddDishByCategoryId(this.dishAddGroup.value)
      );
      this.storeSub = this.storeDishes
        .select(selectedDishes)
        .pipe(filter((response: Dish[]) => !!response))
        .subscribe((dishes: Dish[]) => {
          this.dishes = dishes;
        });
    }
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
