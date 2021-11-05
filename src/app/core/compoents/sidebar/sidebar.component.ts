import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CartService } from '../../services/cart.service';
import { Store } from '@ngrx/store';
import { getCart } from '../cart/store/selectors/cart.selectors';
import { GetCartItems } from '../cart/store/actions/cart.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  title = 'making-orders';
  cart: any;

  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    public cartService: CartService,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.select(getCart).subscribe((cart) => this.cart = cart);
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.cdr.detectChanges();
  }
}
