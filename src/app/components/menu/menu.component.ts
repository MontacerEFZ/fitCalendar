import { Component, OnInit } from '@angular/core';
import {Componente} from "../../common/Componente";
import {FirestoreService} from "../../services/firestore.service";
import {Router} from "@angular/router";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  componentes: Componente[] = [];
  constructor(private fireStoreService: FirestoreService,
              private router: Router,
              private menuController: MenuController) { }

  ngOnInit() {
    this.cargarComponentes();
  }

  private cargarComponentes() {
    this.fireStoreService.getComponentesMenu().subscribe(
      {next:(data: Componente[])=>{
          this.componentes = data;
        },
        error: err => {
          console.log(err)
        },
        complete:()=>{
          console.log("complete")
        }
      }
    )
  }

  logOutt() {
    this.fireStoreService.signOut()
    this.menuController.close('primerMenu');
    this.router.navigate(['/login-register']);
  }
}
