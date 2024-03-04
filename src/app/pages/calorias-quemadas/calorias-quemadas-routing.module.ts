import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaloriasQuemadasPage } from './calorias-quemadas.page';

const routes: Routes = [
  {
    path: '',
    component: CaloriasQuemadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaloriasQuemadasPageRoutingModule {}
