import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { MatProgressBarModule, MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material';



@NgModule({
  declarations: [
    LoadingScreenComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MenuComponent,
    LoadingScreenComponent
  ]
})
export class CoreModule { }
