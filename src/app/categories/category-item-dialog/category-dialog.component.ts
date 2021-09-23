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
  // counterValue = 1;
  //
  // @Input()
  // get counter() {
  //   return this.counterValue;
  // }

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
  }

  addToCart(id: number) {
    this.dialogRef.afterClosed().subscribe(result => {
      let cart = JSON.parse(<string>localStorage.getItem("cart")) || [];
      cart.push({id: id, size: this.size});
      localStorage.setItem('cart', JSON.stringify(cart))
      this.cartService.getCartCounter
    });
    this.dialogRef.close('Successfully add to cart');
  }

  test(num: number): void {
    console.log('NUUUUMBER', num)
  }
}
