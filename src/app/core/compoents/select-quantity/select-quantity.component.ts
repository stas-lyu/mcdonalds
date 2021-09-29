import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss'],
})
export class SelectQuantityComponent implements OnInit {
  isDisabled = true;

  counterValue = 1;

  @Input()
  get counter() {
    return this.counterValue;
  }

  @Output() counterChange = new EventEmitter();

  set counter(val: number) {
    this.counterValue = val;
    this.counterChange.emit(this.counterValue);
  }

  constructor() {}

  ngOnInit(): void {
    if (this.counter > 1) {
      this.isDisabled = false;
    }
  }

  public decrement(): void {
    if (this.counter === 2) {
      this.counter--;
      this.isDisabled = true;
    } else this.counter--;
  }

  public increment(): void {
    if (this.counter === 1) {
      this.counter++;
      this.isDisabled = false;
    } else this.counter++;
  }
}
