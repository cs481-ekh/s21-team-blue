import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestingMainComponent } from './testing-main/testing-main.component';

export const routes: Routes = [

    {
        path: '',
        component: TestingMainComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestingRoutingModule {}
export const TestingRoutingComponents = [TestingMainComponent]