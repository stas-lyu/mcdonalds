import {Component, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss']
})
export class SelectQuantityComponent implements OnInit {

  quantity: number = 1

  isDisabled = true;

  @Output() counterChange = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

   changeQuantity(quantity: number, action: string): void {
    if (action === 'decrement') {
      if (quantity === 2) {
        this.quantity--
        this.isDisabled = true
      } else this.quantity--
    } else {
      this.isDisabled = false
      this.quantity++
    }
     this.counterChange.emit(this.quantity);
   }
}
