import {NgModule} from '@angular/core';
import {MaterialModule} from "./material.module";
import {FilterPipe} from "./pipe/filter.pipe";

@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    FilterPipe,
  ]
})
export class SharedModule {
}
