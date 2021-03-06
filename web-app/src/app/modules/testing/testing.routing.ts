import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTestComponent } from './add-test/add-test.component';
import { SettingsComponent } from './settings/settings.component';
import { TestingMainComponent } from './testing-main/testing-main.component';

export const routes: Routes = [

    {
        path: '',
        component: TestingMainComponent,
    },
    {
      path: 'settings',
      component: SettingsComponent
    },
    {
      path: 'add-test',
      component: AddTestComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestingRoutingModule {}
export const TestingRoutingComponents = [TestingMainComponent]