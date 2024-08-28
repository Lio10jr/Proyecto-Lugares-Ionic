import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LugaresService } from 'src/app/services/lugares.service';

@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.page.html',
  styleUrls: ['./insertar.page.scss'],
})
export class InsertarPage implements OnInit {

  lugarForm!: FormGroup;
  
  constructor(
    private lugarService: LugaresService,
    private route: Router,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.lugarForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      url_imagen: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.lugarForm.valid) {
      this.lugarService.crearLugar(this.lugarForm.value).subscribe(
        async (response) => {
          console.log('Lugar creado:', response);
          this.route.navigate(['/lugares']);
        },
        async (error) => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Ocurrió un error, intentalo de nuevo!',
            buttons: ['OK']
          });
          await alert.present();
          console.error('Error al crear el lugar:', error);
        }
      );
    }
  }

}
