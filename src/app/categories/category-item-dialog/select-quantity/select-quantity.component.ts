import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss']
})
export class SelectQuantityComponent implements OnInit {

  quantity = 1
  isDisabled = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeQuantity(quantity: number, action: string) {
    if (action === 'minus') {
      if (quantity === 2) {
        this.quantity--
        this.isDisabled = true
      } else this.quantity--
    } else {
      this.isDisabled = false
      this.quantity++
    }
  }
}
