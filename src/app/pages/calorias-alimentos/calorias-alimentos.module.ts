import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaloriasAlimentosPageRoutingModule } from './calorias-alimentos-routing.module';

import { CaloriasAlimentosPage } from './calorias-alimentos.page';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CaloriasAlimentosPageRoutingModule,
        ComponentsModule
    ],
  declarations: [CaloriasAlimentosPage]
})
export class CaloriasAlimentosPageModule {}
