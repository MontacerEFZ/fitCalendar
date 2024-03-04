import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {LoginPage} from "../login/login.page";

declare var google;

@Component({
  selector: 'app-calorias-alimentos',
  templateUrl: './calorias-alimentos.page.html',
  styleUrls: ['./calorias-alimentos.page.scss'],
})
export class CaloriasAlimentosPage implements OnInit {
  food: string;
  botonHabilitado: boolean = false;
  btnVerGrafica: boolean = false;
  macros: any;
  auxFood: string;
  gr:number
  ch:number
  pr:number
  showTooltip = false;

  constructor(private  fireService: FirestoreService) { }

  ngOnInit() {
  }

  verTabla() {
    this.auxFood = '100g '+this.food;

    this.fireService.obtenerCaloriasComida(this.auxFood).subscribe(
      (data) => {
        this.macros = data;
        this.btnVerGrafica = true;
        if (data.length === 0) {
          alert('No hay datos disponibles');
        } else {
          // Iterar sobre los datos y guardar los valores de grasas, carbohidratos y proteínas
          for (const macro of this.macros) {
            this.gr = macro.fat_total_g;
            this.ch = macro.carbohydrates_total_g;
            this.pr = macro.protein_g;
          }
        }
      },
      (error) => {
        console.error('Error al obtener calorias', error);
      }
    );
  }

  verGrafica() {
    this.btnVerGrafica = false;
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'cantidad');
    data.addColumn('number', 'total');
    data.addRows([
      ['Grasas', this.gr],
      ['Carbs', this.ch],
      ['Proteínas', this.pr]
    ]);

    var options = {
      'width':400,
      'height':300};

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);

  }

  validarCampos() {
    this.botonHabilitado = (this.food) ? true : false;
  }

  toggleTooltip() {
    this.showTooltip = true;

    setTimeout(() => {
      this.showTooltip = false;
    }, 5000);
  }

}
