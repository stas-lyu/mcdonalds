import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DishDataDialog } from '../../shared/classes/dishDataDialog';
import { CartService } from '../../core/services/cart.service';
import { Subject } from 'rxjs';

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
  sizeList: [] = [];
  notifier = new Subject();

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.dataInfo = this.data;
    this.sizeList = this.dataInfo.size;
    this.currentSize = this.dataInfo.size[0];
    this.price = this.dataInfo.price * (this.counter | 1);
  }

  public addToCart(product: any): void {
    this.dialogRef.afterClosed().subscribe(() => {
      const cart = JSON.parse(<string>localStorage.getItem('cart')) || [];
      if (cart.some((dish: any) => dish.id == product.id)) {
        const index = cart.findIndex((item: any) => {
          return item.id === product.id;
        });
        cart[index].quantity += this.counter;
      } else {
        cart.push(
          Object.assign(product, {
            size: this.sizeList,
            quantity: this.counter || 1,
            cartId: new Date().getMilliseconds(),
          })
        );
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartService.cartCounter;
    });
    this.dialogRef.close('Successfully add to cart');
  }

  public quantityValue(num: number): void {
    this.counter = num;
    this.price = Number((this.dataInfo.price * this.counter).toFixed(2));
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
