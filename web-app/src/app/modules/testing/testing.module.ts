import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingMainComponent } from './testing-main/testing-main.component';
import { TestingRoutingModule } from './testing.routing';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [TestingMainComponent],
  imports: [
    CommonModule,
    TestingRoutingModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule
  ]
})
export class TestingModule { }
