import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculadoraPageRoutingModule } from './calculadora-routing.module';

import { CalculadoraPage } from './calculadora.page';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CalculadoraPageRoutingModule,
        ComponentsModule
    ],
  declarations: [CalculadoraPage]
})
export class CalculadoraPageModule {}
