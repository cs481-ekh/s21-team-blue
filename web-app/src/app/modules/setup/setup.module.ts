import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupMainComponent } from './setup-main/setup-main.component';
import { SetupRoutingModule } from './setup.routing';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms'
import { SetupNewUserComponent } from './setup-new-user/setup-new-user.component';

@NgModule({
  declarations: [SetupMainComponent, SetupNewUserComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    ButtonModule,
    DropdownModule,
    FormsModule
  ]
})
export class SetupModule { }