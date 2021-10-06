import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './compoents/footer/footer.component';
import { PageNotFoundComponent } from './compoents/page-not-found/page-not-found.component';
import { NavComponent } from './compoents/nav/nav.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './compoents/cart/cart.component';
import { CategoriesModule } from '../categories/categories.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './compoents/home/home.component';
import { ThankYouPageComponent } from './compoents/thank-you-page/thank-you-page.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './compoents/cart/store/reducers/cart.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './compoents/cart/store/effects/cart.effects';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavComponent,
    FooterComponent,
    CartComponent,
    HomeComponent,
    ThankYouPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CategoriesModule,
    FormsModule,
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
  exports: [NavComponent, FooterComponent],
})
export class CoreModule {}
