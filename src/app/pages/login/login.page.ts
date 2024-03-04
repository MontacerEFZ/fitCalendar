import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingController} from "@ionic/angular";
import {FirestoreService} from "../../services/firestore.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController,
              private authService: FirestoreService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm =  this.formBuilder.group(
      {
        email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required]],
      }
    )
  }


  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const email = this.loginForm.value.email
    const password = this.loginForm.value.password

    if (this.loginForm?.valid){
      const user = await this.authService.loginUser(email, password).catch((error) =>{
        console.log(error)
        loading.dismiss()
      })

      if (user){
        await loading.dismiss()
        await this.router.navigate(['/add'])
        this.loginForm.reset();
      }else {
        await loading.dismiss()
        this.loginForm.reset();
        alert('Email o contraseña incorrectos.');
      }
    }else {
      await loading.dismiss()
      this.loginForm.reset();
      alert('Email o contraseña incorrectos.');
    }
  }

}
