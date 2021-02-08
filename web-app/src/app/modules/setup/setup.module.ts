import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupMainComponent } from './setup-main/setup-main.component';
import { SetupRoutingModule } from './setup.routing';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [SetupMainComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    ButtonModule
  ]
})
export class SetupModule { }