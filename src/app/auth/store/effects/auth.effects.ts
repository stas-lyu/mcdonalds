import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '../../../core/services/auth.service';
import { of } from 'rxjs';
import { User } from '../models/auth.model';

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authService: AuthService) {}

  // @ts-ignore
  registration = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.EAuthActions.Registration),
      switchMap((action: AuthActions.RegistrationAuth) => {
        return this.authService.addUser(action.payload).pipe(
          map((data) => {
            return new AuthActions.RegistrationAuthSuccess(data);
          }),
          catchError((error) =>
            of(new AuthActions.RegistrationAuthFailure({ error: error }))
          )
        );
      })
    );
  });

  login = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.EAuthActions.Login),
      switchMap((action: AuthActions.LoginAuth) => {
        return this.authService.login(action.payload).pipe(
          map((data) => {
            return new AuthActions.LoginAuthSuccess(data);
          }),
          catchError((error) =>
            of(new AuthActions.LoginAuthFailure({ error: error }))
          )
        );
      })
    );
  });

  //
  // logout = createEffect(() =>
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
