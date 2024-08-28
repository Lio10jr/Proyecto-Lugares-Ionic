import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  formData: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.formData = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  async login() {
    var formData: any = new FormData();
    if (this.formData.valid) {
      this.isLoading = true;
      formData.append('email', this.formData.get('email')!.value);
      formData.append('password', this.formData.get('password')!.value);

      const formValues = this.formData.value;

      this.auth.userLogin(formValues).subscribe(
        async (data: any) => {
          console.log(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.router.navigate(['/lugares']);          
        },
        async (error: any) => {
          console.error(error);
          this.isLoading = false;
          const alert = await this.alertCtrl.create({
            header: 'Falló el inicio de sesión',
            message: 'Inválido email o contraseña',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Advertencia',
        message: 'Ingrese datos válidos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
