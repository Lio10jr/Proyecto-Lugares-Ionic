import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LugaresService } from 'src/app/services/lugares.service';
import { Lugar } from '../model/lugar.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  lugar: Lugar | undefined;
  lugarForm!: FormGroup;
  constructor(
    private lugaresService: LugaresService,
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.lugarForm = this.fb.group({
      nombre: ['', [Validators.required]],
      url_image: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('lugarId');
      if (id) {
        this.lugaresService.getLugar(parseInt(id)).subscribe(
          (result) => {
            this.lugar = result;
            this.lugarForm.patchValue({
              nombre: this.lugar.nombre,
              url_image: this.lugar.url_imagen,
            });
          },
          (error) => {
            console.error('Error al obtener el lugar:', error);
          }
        );
      }
    });
  }

  
  guardarLugar(tit: any, img: any)
  {
    /* if (this.lugarForm.valid) {
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
    } */
  }

  async editarComentario(indice: number, comentarioActual: string) {
    const alert = await this.alertController.create({
      header: 'Editar Comentario',
      inputs: [
        {
          name: 'nuevoComentario',
          type: 'text',
          placeholder: 'Nuevo Comentario',
          value: comentarioActual, // Mostrar el comentario actual en el input
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Canceled');
          },
        },
        {
          text: 'Guardar',
          handler: (data) => {
            // Llamar al servicio para editar el comentario
            //this.oser.editComentario(this.lugar.Codigo, indice, data.nuevoComentario);
          },
        },
      ],
    });

    await alert.present();
  }

  async eliminarComentario(indice: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar Comentario',
      message: '¿Desea eliminar este comentario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Llamar al servicio para eliminar el comentario
            //this.oser.deleteComentario(this.lugar.Codigo, indice);
          },
        },
      ],
    });

    await alert.present();
  }

  async onSubmit() {
    if (this.lugarForm.valid && this.lugar) {
      const updatedLugar: Lugar = {
        ...this.lugar,
        nombre: this.lugarForm.value.nombre,
        url_imagen: this.lugarForm.value.url_image,
      };
      
      this.lugaresService.actualizarLugar(this.lugar.id!, updatedLugar).subscribe(
        async () => {
          const alert = await this.alertController.create({
            header: 'Lugar Modificado',
            message: 'El lugar ha sido modificado exitosamente.',
            buttons: ['OK'],
          });
          await alert.present();
          this.route.navigate(['/lugares']);
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un problema al modificar el lugar.',
            buttons: ['OK'],
          });
          await alert.present();
          console.error('Error al modificar el lugar:', error);
        }
      );
    }
  }

}
