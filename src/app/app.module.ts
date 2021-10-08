import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CustomerModule } from './customer/customer.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { AdminModule } from './admin/admin.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SidebarModule } from './core/compoents/sidebar/sidebar.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CategoriesEffects } from './categories/store/effects/categories.effects';
import { environment } from '../environments/environment';
import { categoriesReducer } from './categories/store/reducers/categories.reducer';
import { DishesEffects } from './categories/store/effects/dishes.effects';
import { dishesReducer } from './categories/store/reducers/dishes.reducer';
import { authReducer } from './auth/store/reducers/auth.reducer';
import { AuthEffects } from './auth/store/effects/auth.effects';
import { cartReducer } from './core/compoents/cart/store/reducers/cart.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    CustomerModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    CategoriesModule,
    AdminModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    SidebarModule,
    EffectsModule.forRoot([CategoriesEffects, DishesEffects, AuthEffects]),
    StoreModule.forRoot(categoriesReducer),
    StoreModule.forRoot(dishesReducer),
    StoreModule.forRoot(authReducer),
    StoreModule.forRoot(cartReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
