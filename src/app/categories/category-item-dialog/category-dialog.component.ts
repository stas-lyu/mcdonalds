import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DishDataDialog} from "../../shared/classes/dishDataDialog";
import {CartItem} from "../../shared/classes/cartItem";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  dataInfo: DishDataDialog
  isShowSize = false;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataInfo = data
  }

  ngOnInit(): void {
    this.isShowSize = !!this.dataInfo.size;
  }

  addToCart() {
    this.dialogRef.afterClosed().subscribe(result => {
      localStorage.setItem('cart', JSON.stringify([1,2,3]))
    });
    this.dialogRef.close('Successfully add to cart');
  }
}
