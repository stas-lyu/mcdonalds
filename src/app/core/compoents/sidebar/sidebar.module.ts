import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MaterialModule } from '../../../shared/material.module';
import { CoreModule } from '../../core.module';
import { AppRoutingModule } from '../../../app-routing.module';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    AppRoutingModule,
    LoadingBarModule,
    MatProgressBarModule,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
