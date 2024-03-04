import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage  {
  kg: number;
  cm: number;
  edad: number;
  selectedOption: number;
  botonHabilitado: boolean = false;
  resultado: any
  auxResultado: any
  macros: any;
  ch: number;
  pr: number;
  gr: number;
  showTooltip = false;

  constructor() {}

  toggleTooltip() {
    this.showTooltip = true;

    setTimeout(() => {
      this.showTooltip = false;
    }, 5000);
  }

  calcularChico() {
    this.resultado = Math.round(((10 * this.kg) + (6.25 * this.cm) - (5 * this.edad) + 5) * this.selectedOption);
    this.auxResultado = this.resultado
    this.resultado = this.resultado.toString() + " Calorías";

    this.ch =Math.round((this.auxResultado*0.5)/4);
    this.pr = Math.round((this.auxResultado*0.3)/4);
    this.gr = Math.round((this.auxResultado*0.2)/9);
    this.macros = this.ch.toString() + "g Ch // "
      + this.pr.toString() + "g Pr // "
      + this.gr.toString() + "g Gr";

  }

  calcularChica() {
    this.resultado = Math.round(((10 * this.kg) + (6.25 * this.cm) - (5 * this.edad) - 161) * this.selectedOption);
    this.auxResultado = this.resultado
    this.resultado = this.resultado.toString() + " Calorías";

    this.ch =Math.round((this.auxResultado*0.5)/4);
    this.pr =Math.round( (this.auxResultado*0.3)/4);
    this.gr = Math.round((this.auxResultado*0.2)/9);
    this.macros = this.ch.toString() + "g Ch // "
      + this.pr.toString() + "g Pr // "
      + this.gr.toString() + "g Gr";
  }

  validarCampos() {
    this.botonHabilitado = (this.kg && this.cm && this.edad && this.selectedOption) ? true : false;
  }
}
