import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupMainComponent } from './setup-main/setup-main.component';
import { SetupNewUserComponent } from './setup-new-user/setup-new-user.component';


export const routes: Routes = [

    {
        path: '',
        component: SetupMainComponent,
    },
    {
        path: 'new-user',
        component: SetupNewUserComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}
export const SetupRoutingComponents = [SetupMainComponent]