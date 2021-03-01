import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupMainComponent } from './setup-main/setup-main.component';
import { SetupRoutingModule } from './setup.routing';
import { SetupNewUserComponent } from './setup-new-user/setup-new-user.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [SetupMainComponent, SetupNewUserComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    SharedModule

  ]
})
export class SetupModule { }