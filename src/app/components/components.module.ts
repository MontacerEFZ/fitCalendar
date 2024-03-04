import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {MenuComponent} from "./menu/menu.component";
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {NgApexchartsModule} from "ng-apexcharts";



@NgModule({
  declarations: [HeaderComponent, MenuComponent, ],
  exports: [
    HeaderComponent, MenuComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    NgApexchartsModule
  ]
})
export class ComponentsModule { }
