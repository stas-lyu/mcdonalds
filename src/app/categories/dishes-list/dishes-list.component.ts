import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { Dish } from '../../shared/classes/dish';
import { CategoryDialogComponent } from '../category-item-dialog/category-dialog.component';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IDishesState } from '../store/state/dishes.state';
import * as DishesActions from '../store/actions/dishes.actions';
import { selectedDishes } from '../store/selectors/dishes.selectors';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss'],
})
export class DishesListComponent implements OnInit {
  dishesList: Dish[] = [];
  notifier = new Subject();
  storeSub!: Subscription;

  constructor(
    private dishesService: CategoriesService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<IDishesState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.notifier))
      .subscribe((params: Params) => {
        this.getDishesByCategoryId(params.category);
      });
  }

  public openDishesDescriptionModal(dish: Dish): void {
    this.dialog.open(CategoryDialogComponent, {
      data: dish,
    });
  }

  private getDishesByCategoryId(id: number): void {
    this.store.dispatch(new DishesActions.LoadDishes(id));
    this.storeSub = this.store
      .select(selectedDishes)
      .subscribe((dishes: Dish[]) => {
        this.dishesList = dishes;
      });
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
