import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DishDataDialog} from "../../shared/classes/dishDataDialog";
import {CartService} from "../../core/services/cart.service";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  dataInfo: DishDataDialog
  isShowSize = false;
  size: string = '';
  quantity!: number;
  price!: number;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
  ) {
    this.dataInfo = data
  }

  ngOnInit(): void {
    this.isShowSize = !!this.dataInfo.size;
    this.size = this.dataInfo.size[0];
    this.price = this.dataInfo.price * (this.quantity | 1);
  }

  addToCart(product: object) {
    this.dialogRef.afterClosed().subscribe(result => {
      let cart = JSON.parse(<string>localStorage.getItem("cart")) || [];
      cart.push(Object.assign(product, {size: this.size, id: new Date().getMilliseconds(), quantity: this.quantity ?? 1}));
      localStorage.setItem('cart', JSON.stringify(cart))
      this.cartService.getCartCounter
    });
    this.dialogRef.close('Successfully add to cart');
  }

  public quantityValue(num: number): void {
    this.quantity = num
    this.price = Number((this.dataInfo.price * this.quantity).toFixed(2))
  }
}
