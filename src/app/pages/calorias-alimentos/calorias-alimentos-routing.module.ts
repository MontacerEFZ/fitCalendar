import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaloriasAlimentosPage } from './calorias-alimentos.page';

const routes: Routes = [
  {
    path: '',
    component: CaloriasAlimentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaloriasAlimentosPageRoutingModule {}
