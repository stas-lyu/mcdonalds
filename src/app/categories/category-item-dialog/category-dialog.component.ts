import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DishDataDialog} from "../../shared/classes/dishDataDialog";
import {CartService} from "../../core/services/cart.service";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  dataInfo!: DishDataDialog
  isShowSize = false;
  size: string = '';
  counter!: number;
  price!: number;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    this.dataInfo = this.data
    this.isShowSize = !!this.dataInfo.size;
    this.size = this.dataInfo.size[0];
    this.price = this.dataInfo.price * (this.counter | 1);
  }

  public addToCart(product: object):void {
    this.dialogRef.afterClosed().subscribe(() => {
      const cart = JSON.parse(<string>localStorage.getItem("cart")) || [];
      cart.push(Object.assign(product, {
        size: this.size,
        id: new Date().getMilliseconds(),
        quantity: this.counter ?? 1
      }));
      localStorage.setItem('cart', JSON.stringify(cart))
      this.cartService.cartCounter
    });
    this.dialogRef.close('Successfully add to cart');
  }

  public quantityValue(num: number): void {
    this.counter = num
    this.price = Number((this.dataInfo.price * this.counter).toFixed(2))
  }
}
