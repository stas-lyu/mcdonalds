import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCounter = 0;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("cart") !== null) {
    this.cartCounter = JSON.parse(<string>localStorage.getItem("cart")).length
    }
  }

}
