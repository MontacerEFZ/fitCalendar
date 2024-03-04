import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {
  ejercicio: any;
  selectedOption: any;
  botonHabilitado: boolean = false;


  constructor(private  fireService: FirestoreService) { }

  ngOnInit() {
  }

  ver(){
    this.ejercicio = this.selectedOption;

    this.fireService.obtenerEjercicios(this.ejercicio).subscribe(
      (data) => {
        data.forEach(exercise => {
          exercise.equipment = exercise.equipment.replace(/_/g, ' ');
        });

        this.ejercicio = data;
      },
      (error) => {
        console.error('Error al obtener ejercicios', error);
      }
    );
  }

  validarCampos() {
    this.botonHabilitado = (this.selectedOption) ? true : false;
  }

  generateYoutubeLink(exerciseName: string): string {
    const searchQuery = exerciseName.replace(/\s+/g, '+');
    return `https://www.youtube.com/results?search_query=${searchQuery}`;
  }

  toggleInstructions(exercise: any) {
    exercise.showFullInstructions = !exercise.showFullInstructions;
  }

}
