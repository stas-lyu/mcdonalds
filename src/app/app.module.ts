import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {DataService} from './core/services/data.service';
import {CustomerModule} from "./customer/customer.module";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {CategoriesModule} from "./categories/categories.module";
import {AdminModule} from "./admin/admin.module";
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
  declarations: [
    AppComponent,
  ],
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
    HttpClientInMemoryWebApiModule.forRoot(DataService, {dataEncapsulation: false}),
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
