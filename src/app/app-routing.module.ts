import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {LoginComponent} from "./auth/login/login.component";
import {PageNotFoundComponent} from "./core/compoents/page-not-found/page-not-found.component";
import {AdminComponent} from "./admin/admin/admin.component";
import {AuthGuard} from "./core/guard/auth.guard";

const routes: Routes = [
  {path: 'sign-up', component: SignUpComponent},
  {path: 'auth', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {
}
