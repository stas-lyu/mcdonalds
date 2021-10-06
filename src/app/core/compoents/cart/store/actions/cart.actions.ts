import { Action } from '@ngrx/store';
import { CartItem } from '../models/cart.models';

export enum ECartActions {
  LoadCart = '[Cart] Load Cart',
  LoadCartSuccess = '[Cart] Load Cart Success',
  LoadCartFailure = '[Cart] Load Cart Failure',
  UpdateCart = '[Cart] Update CartItem',
  UpdateCartSuccess = '[Cart] Update CartItem Success',
  DeleteCart = '[Cart] Delete CartItem',
  DeleteCartSuccess = '[Cart] Delete CartItem Success',
}

export class LoadCart implements Action {
  public readonly type = ECartActions.LoadCart;
}

export class LoadCartSuccess implements Action {
  public readonly type = ECartActions.LoadCartSuccess;

  constructor(public payload: CartItem[]) {}
}

export class UpdateCart implements Action {
  public readonly type = ECartActions.UpdateCart;

  constructor(public payload: any) {}
}

export class UpdateCartSuccess implements Action {
  public readonly type = ECartActions.UpdateCartSuccess;

  constructor(public payload: CartItem[]) {}
}

export class DeleteCart implements Action {
  public readonly type = ECartActions.DeleteCart;

  constructor(public payload: number) {}
}

export class DeleteCartSuccess implements Action {
  public readonly type = ECartActions.DeleteCartSuccess;

  constructor(public payload: CartItem[]) {}
}

export class LoadCartFailure implements Action {
  public readonly type = ECartActions.LoadCartFailure;

  constructor(public payload: { error: any }) {}
}

export type CartActions =
  | LoadCart
  | LoadCartSuccess
  | UpdateCart
  | UpdateCartSuccess
  | DeleteCart
  | DeleteCartSuccess
  | LoadCartFailure;
