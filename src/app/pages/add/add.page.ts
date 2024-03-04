import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {Puntos} from "../../common/user";
import {Router} from "@angular/router";

declare var google;
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit{
puntos: Puntos = {
  puntos: 0
}
  showTooltip = false;
  cantidadDocumentosPositivos: number;
  cantidadDocumentosNegativos: number;

  constructor(private  fireService: FirestoreService,
              private router: Router) { }

  ngOnInit(): void {
   // this.comprobarLogin()
    this.obtenerCantidadDocumentosPositivos();
    this.obtenerCantidadDocumentosNegativos();
    this.show()
  }

  toggleTooltip() {
    this.showTooltip = true;

    setTimeout(() => {
      this.showTooltip = false;
    }, 5000);
  }

  obtenerCantidadDocumentosPositivos() {
    this.fireService.getCantidadDocumentosEnColeccion('puntosPositivos').subscribe(cantidad => {
      this.cantidadDocumentosPositivos = cantidad;
    });
  }
  obtenerCantidadDocumentosNegativos() {
    this.fireService.getCantidadDocumentosEnColeccion('puntosNegativos').subscribe(cantidad => {
      this.cantidadDocumentosNegativos = cantidad*-1;
    });
  }

  mas() {
  this.puntos.puntos = this.puntos.puntos+1
   const response = this.fireService.masPuntos(this.puntos);
    console.log(response)
    this.puntos.puntos = 0
    setInterval(() => {
      location.reload();
    }, 500);
  }

  menos() {
  this.puntos.puntos = this.puntos.puntos-1
   const response = this.fireService.menosPuntos(this.puntos);
    console.log(response)
    this.puntos.puntos = 0
    setInterval(() => {
      location.reload();
    }, 500);
  }


  reset() {
    this.fireService.eliminarTodosDocumentos('puntosPositivos');
    this.fireService.eliminarTodosDocumentos('puntosNegativos');
    setInterval(() => {
      location.reload();
    }, 500);
  }

   show() {
     var data = new google.visualization.DataTable();
     data.addColumn('string', 'tiempo');
     data.addColumn('number', 'asistencia');
     data.addRows([
       ['Puntos Positivos', this.cantidadDocumentosPositivos],
       ['Puntos Negativos', this.cantidadDocumentosNegativos*-1]
     ]);

     var options = {
       'width':400,
       'height':300};

     var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
     chart.draw(data, options);
   }

   comprobarLogin() {
     // this.fireService.getProfile().then(user => {
     //   //alert(user)
     //   if (!user) {
     //     this.router.navigate(['/login-register']);
     //   }
     // });

     //    this.fireService.obtenerUIDUsuario().then(user => {
     //      alert('aaaa '+user)
     //    });
     // }
   }
}
