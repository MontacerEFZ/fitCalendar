import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaloriasQuemadasPageRoutingModule } from './calorias-quemadas-routing.module';

import { CaloriasQuemadasPage } from './calorias-quemadas.page';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CaloriasQuemadasPageRoutingModule,
        ComponentsModule
    ],
  declarations: [CaloriasQuemadasPage]
})
export class CaloriasQuemadasPageModule {}
