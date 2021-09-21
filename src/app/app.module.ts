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
    HttpClientInMemoryWebApiModule.forRoot(DataService, {dataEncapsulation: false}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
