// import { Injectable } from '@angular/core';
// import { ofType, Actions, createEffect } from '@ngrx/effects';
// import { catchError, map, switchMap } from 'rxjs/operators';
// import * as DishesAction from '../actions/dishes.actions';
// import { CategoriesService } from '../../../core/services/categories.service';
// import { of } from 'rxjs';
//
// @Injectable()
// export class CategoriesEffects {
//   constructor(
//     private actions: Actions,
//     private dishesService: CategoriesService
//   ) {}
//
//   loadCategories = createEffect(() =>
//     this.actions.pipe(
//       ofType(DishesAction.EDishesActions.LoadDishes),
//       switchMap((action: any) => {
//         return this.dishesService.getDishesByCategoryId().pipe(
//           map((categories) => {
//             console.log(categories);
//             return new DishesAction.LoadDishesSuccess(dishes);
//           }),
//           catchError((error) =>
//             of(new DishesAction.LoadCategoriesFailure({ error: error }))
//           )
//         );
//       })
//     )
//   );
// }
