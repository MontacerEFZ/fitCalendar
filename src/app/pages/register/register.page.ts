import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingController} from "@ionic/angular";
import {FirestoreService} from "../../services/firestore.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private loadingCtrl: LoadingController,
               private authService: FirestoreService,
               private router: Router) { }

  ngOnInit() {
    this.regForm =  this.formBuilder.group(
      {
        email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(8)]],
      }
    )
  }


  async signUp(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const email = this.regForm.value.email
    const password = this.regForm.value.password


    if (this.regForm?.valid){
      const user = await this.authService.registerUser(email, password).catch((error) =>{

          console.log(error)
          loading.dismiss()
      })

      if (user){
        await loading.dismiss()
        await this.router.navigate(['/add'])
        this.regForm.reset();
      }
    }else {
      await loading.dismiss()
      this.regForm.reset();
      alert('Email o contraseña incorrectos. Contraseña 8 caracteres mínimo.');
    }
  }

}
