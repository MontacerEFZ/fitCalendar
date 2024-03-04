import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'app-calorias-quemadas',
  templateUrl: './calorias-quemadas.page.html',
  styleUrls: ['./calorias-quemadas.page.scss'],
})
export class CaloriasQuemadasPage implements OnInit {
  sport: string
  botonHabilitado: boolean = false;
  ejercicios: any;
  constructor(private  fireService: FirestoreService) { }

  ngOnInit() {
  }

  validarCampos() {
    this.botonHabilitado = (this.sport) ? true : false;

  }

  verTabla() {
    this.fireService.obtenerCaloriasQuemadas(this.sport).subscribe(
      (data) => {

        this.ejercicios = data;
        if (data.length === 0) {
          alert('No hay datos disponibles');
        }
      },
      (error) => {
        console.error('Error al obtener ejercicios', error);
      }
    );
  }
}
