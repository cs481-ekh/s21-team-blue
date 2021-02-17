import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { RouteGuard } from './shared/guards/route-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'setup',
    pathMatch: 'full'
  },
  {
    path: 'setup',
    loadChildren: () =>
      import('./modules/setup/setup.module').then(m => m.SetupModule)
  },
  {
    path: 'main',
    canActivate: [RouteGuard],
    loadChildren: () =>
      import('./modules/testing/testing.module').then(m => m.TestingModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
