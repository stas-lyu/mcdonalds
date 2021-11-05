import { Action } from '@ngrx/store';
import { CartItem } from '../models/cart.models';

export enum ECartActions {
  AddItem = '[Cart] Add Item',
  DeleteItem = '[Cart] Delete Item',
  DeleteAllItems = '[Cart] Delete All Items',
  UpdateItem = '[Cart] Update Item',
  GetCartItems = '[Cart] Get Cart Items'
}

export class GetCartItems implements Action {
  readonly type = ECartActions.GetCartItems;

  constructor() {}
}

export class AddItemAction implements Action {
  readonly type = ECartActions.AddItem;

  constructor(public payload: CartItem) {}
}

// Delete Single
export class DeleteItemAction implements Action {
  readonly type = ECartActions.DeleteItem;

  constructor(public payload: string) {}
}

// Delete All
export class DeleteAllItemAction implements Action {
  readonly type = ECartActions.DeleteAllItems;

  constructor() {}
}

// Update
export class UpdateItemAction implements Action {
  readonly type = ECartActions.UpdateItem;

  constructor(public payload: CartItem) {}
}

export type CartActions =
  | GetCartItems
  | AddItemAction
  | UpdateItemAction
  | DeleteAllItemAction
  | DeleteItemAction;
