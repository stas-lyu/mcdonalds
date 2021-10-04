import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './core/compoents/page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AuthGuard } from './core/guard/auth.guard';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { DishesListComponent } from './categories/dishes-list/dishes-list.component';
import { HomeComponent } from './core/compoents/home/home.component';
import { CartComponent } from './core/compoents/cart/cart.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ThankYouPageComponent } from './core/compoents/thank-you-page/thank-you-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/:category', component: DishesListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'thank-you-page', component: ThankYouPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
