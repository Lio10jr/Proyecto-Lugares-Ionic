import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formData: FormGroup;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.formData = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  async register() {
    var formData: any = new FormData();
    if (this.formData.valid) {
      this.isLoading = true
      formData.append('nombre', this.formData.get('nombre')!.value);
      formData.append('email', this.formData.get('email')!.value);
      formData.append('password', this.formData.get('password')!.value);
      const formValues = this.formData.value;
      this.auth.userRegister(formValues).subscribe(
        async (data: any) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.router.navigate(['/lugares']);  
        },
        async (error: any) => {
          console.error(error);
          this.isLoading = false;
          const alert = await this.alertCtrl.create({
            header: 'Falló',
            message: 'Error al crear usuario',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Ingrese datos válidos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
