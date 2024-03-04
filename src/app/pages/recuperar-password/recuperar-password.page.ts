import { Component } from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage  {
email: string
  constructor(private authService: FirestoreService,
              private router: Router) { }



  async resetPassword(){
  await this.authService.resetPassword(this.email).then(()=>{
    this.router.navigate(['login'])
  }).catch((error)=>{
      console.log(error)
    })
  }


}
