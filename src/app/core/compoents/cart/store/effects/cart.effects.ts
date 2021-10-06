import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as CartActions from '../actions/cart.actions';
import { CartService } from '../../../../services/cart.service';
import { of } from 'rxjs';
const cartData: any = [];

@Injectable()
export class CartEffects {
  constructor(private actions: Actions, private cartService: CartService) {}

  loadCart = createEffect(() =>
    this.actions.pipe(
      ofType(CartActions.ECartActions.LoadCart),
      mergeMap(() => {
        return this.cartService.loadCart().pipe(
          map((cart: any) => {
            cartData.push(cart);
            return new CartActions.LoadCartSuccess(cartData);
          }),
          catchError((error) =>
            of(new CartActions.LoadCartFailure({ error: error }))
          )
        );
      })
    )
  );

  // updateCategory = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(CategoriesActions.ECategoriesActions.UpdateCategory),
  //     switchMap((action: CategoriesActions.UpdateCategory) => {
  //       return this.categoriesService.editCategory(action.payload).pipe(
  //         map((categories: any) => {
  //           return new CategoriesActions.UpdateCategorySuccess(categories);
  //         })
  //         // catchError((error) =>
  //         //   of(new CategoriesActions.D({ error: error }))
  //         // )
  //       );
  //     })
  //   )
  // );
  //
  // deleteCategory = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(CategoriesActions.ECategoriesActions.DeleteCategory),
  //     switchMap((action: CategoriesActions.DeleteCategory) => {
  //       return this.categoriesService.deleteCategory(action.payload).pipe(
  //         map((categories: any) => {
  //           return new CategoriesActions.DeleteCategorySuccess(categories);
  //         })
  //         // catchError((error) =>
  //         //   of(new CategoriesAction.LoadDishesFailure({ error: error }))
  //         // )
  //       );
  //     })
  //   )
  // );
}
