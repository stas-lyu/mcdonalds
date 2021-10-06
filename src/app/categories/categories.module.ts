import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { CategoryDialogComponent } from './category-item-dialog/category-dialog.component';
import { AppRoutingModule } from '../app-routing.module';
import { DishesListComponent } from './dishes-list/dishes-list.component';
import { SelectQuantityComponent } from '../core/compoents/select-quantity/select-quantity.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './store/effects/categories.effects';
import { DishesEffects } from './store/effects/dishes.effects';
import { StoreModule } from '@ngrx/store';
import { categoriesReducer } from './store/reducers/categories.reducer';
import { dishesReducer } from './store/reducers/dishes.reducer';
@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryDialogComponent,
    DishesListComponent,
    SelectQuantityComponent,
  ],
  exports: [SelectQuantityComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forFeature('categories', categoriesReducer),
    StoreModule.forFeature('dishes', dishesReducer),
    EffectsModule.forFeature([CategoriesEffects, DishesEffects]),
  ],
})
export class CategoriesModule {}
