import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    loadChildren: () =>
      import('./modules/testing/testing.module').then(m => m.TestingModule)
  },
  // {
  //   path: '**',
  //   redirectTo: '404',
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
