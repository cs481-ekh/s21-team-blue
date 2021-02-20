import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingMainComponent } from './testing-main/testing-main.component';
import { TestingRoutingModule } from './testing.routing';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { SettingsComponent } from './settings/settings.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [TestingMainComponent, SettingsComponent],
  imports: [
    CommonModule,
    TestingRoutingModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    DialogModule
  ]
})
export class TestingModule { }
