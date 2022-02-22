import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalRegisterPage } from './local-register.page';

const routes: Routes = [
  {
    path: '',
    component: LocalRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalRegisterPageRoutingModule {}
