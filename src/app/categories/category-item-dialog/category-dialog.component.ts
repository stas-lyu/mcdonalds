import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DishDataDialog } from '../../shared/classes/dishDataDialog';
import { CartService } from '../../core/services/cart.service';
import { Subject } from 'rxjs';
import { AddItemAction } from '../../core/compoents/cart/store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { ICartState } from '../../core/compoents/cart/store/state/cart.state';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  dataInfo!: DishDataDialog;
  currentSize: string = '';
  counter: number = 1;
  price!: number;
  notifier = new Subject();

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
    private store: Store<ICartState>
  ) {}

  ngOnInit(): void {
    this.dataInfo = this.data;
    this.price = this.dataInfo.price * (this.counter | 1);
  }

  public addToCart(selectedProduct: any): void {
    // const newShoppingItem = {
    //   id: uuid(),
    //   quantity: 1,
    //   price: selectedProduct.productPrice,
    //   product: selectedProduct
    // } as ShoppingItem;

    const product = {
      ...selectedProduct,
      id: new Date().getMilliseconds(),
      quantity: this.counter,
    };

    this.store.dispatch(new AddItemAction(product));

    this.dialogRef.close('Successfully add to cart');
  }

  // public addToCart(product: any): void {
  //   console.log(product);
  //   this.dialogRef.afterClosed().subscribe(() => {
  //     const cart = JSON.parse(<string>localStorage.getItem('cart')) || [];
  //     if (cart.some((dish: any) => dish.id == product.id)) {
  //       const index = cart.findIndex((item: any) => {
  //         return item.id === product.id;
  //       });
  //       cart[index].quantity += this.counter;
  //     } else {
  //       cart.push({
  //         ...product,
  //         quantity: this.counter || 1,
  //         cartId: new Date().getMilliseconds(),
  //       });
  //     }
  //
  //     localStorage.setItem('cart', JSON.stringify(cart));
  //     this.cartService.cartCounter;
  //   });
  //   this.dialogRef.close('Successfully add to cart');
  // }

  public quantityValue(num: number): void {
    this.counter = num;
    this.price = Number((this.dataInfo.price * this.counter).toFixed(2));
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
