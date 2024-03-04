import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-agua',
  templateUrl: './agua.page.html',
  styleUrls: ['./agua.page.scss'],
})
export class AguaPage implements OnInit {
  agua: any = 0;
  cantidad: number;
  showTooltip = false;

  constructor(private  fireService: FirestoreService,
              private router: Router) { }

  ngOnInit(): void {
    this.obtenerCantidad();
  }

  toggleTooltip() {
    this.showTooltip = true;

    setTimeout(() => {
      this.showTooltip = false;
    }, 5000);
  }

  obtenerCantidad() {
    this.fireService.getCantidadDocumentosEnColeccion('registroAgua').subscribe(cantidad => {
      this.cantidad = cantidad/2;
    });
  }

  mas() {
    this.agua = this.agua+1
    const response = this.fireService.registroAgua(this.agua);
    console.log(response)
    this.agua = 0
    setInterval(() => {
      location.reload();
    }, 500);
  }


  reset() {
    this.fireService.eliminarTodosDocumentos('registroAgua');
    setInterval(() => {
      location.reload();
    }, 500);
  }
}
