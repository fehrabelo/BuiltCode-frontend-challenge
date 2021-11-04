import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from './public/public.module';
import { SecureModule } from './secure/secure.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.module')
      .then(m => m.PublicModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PublicModule,
    // SecureModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
