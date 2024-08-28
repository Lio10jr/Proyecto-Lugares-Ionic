import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LugaresService } from 'src/app/services/lugares.service';
import { Lugar } from '../model/lugar.model';
import { Comentario } from '../model/comentario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComentarioService } from 'src/app/services/comentario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  lugar: Lugar | undefined;
  public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'New',
    }
  ];
  comentarios: any[] = [];
  comentarioForm!: FormGroup;
  
  constructor(
    private authService: AuthService,
    private lugaresService: LugaresService,
    private comentarioService: ComentarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
  ) {
    this.comentarioForm = this.fb.group({
      comentario: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('LugarId');
      if (id) {
        this.lugaresService.getLugar(parseInt(id)).subscribe(
          (result) => {
            this.lugar = result;
            this.obtenerComentarios(parseInt(id));
          },
          (error) => {
            console.error('Error al obtener el lugar:', error);
          }
        );
      }
    });
  }

  obtenerComentarios(lugarId: number) {
    this.comentarioService.getComentariosbyId(this.lugar!.id!).subscribe(
      (result) => {
        this.comentarios = result;
      },
      (error) => {
        console.error('Error al obtener comentarios:', error);
      }
    );
  }

  async agregarComentario() {
    if (this.comentarioForm.valid && this.lugar) {
      const user = this.authService.obtenerLocalStorageJson('user');
      const nuevoComentario: Comentario = {
        comentario: this.comentarioForm.value.comentario,
        lugar_id: this.lugar.id!,
        usuario_id: user.id,
      };

      this.comentarioService.addComentario(nuevoComentario).subscribe(
        async (result) => {
          const alert = await this.alertController.create({
            header: 'Comentario Agregado',
            message: 'Tu comentario ha sido agregado exitosamente.',
            buttons: ['OK'],
          });
          await alert.present();
          this.comentarioForm.reset();
          this.obtenerComentarios(this.lugar!.id!);
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un problema al agregar tu comentario.',
            buttons: ['OK'],
          });
          await alert.present();
          console.error('Error al agregar comentario:', error);
        }
      );
    }
  }

  async actualizarLugar() {
    const id = this.lugar?.id;
    this.router.navigate(['/modificar', id]);
  }

  async eliminarLugar() {
    const alert = await this.alertController.create({
      header: 'Eliminar Lugar',
      message: '¿Desea eliminar este lugar de la lista?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            const id = this.lugar?.id;
            this.lugaresService.eliminarLugar(id!).subscribe(
              result => {
                this.router.navigateByUrl('/lugares');
              },
              async error => {
                const alert = await this.alertController.create({
                  header: 'Error',
                  message: 'Ocurrió un error, intentalo de nuevo!',
                  buttons: ['OK']
                });
                await alert.present();
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async newComentario() {
    const alert = await this.alertController.create({
      header: 'Ingrese nuevo comentario',
      inputs: [
        {
          name: 'Comentario',
          type: 'text',
          placeholder: 'Comentario',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Canceled');
          },
        },
        {
          text: 'OK',
          handler: (data) => {
            //this.lugaresService.addComentario(this.lugar.id, data.Comentario);
          },
        },
      ],
    });
    await alert.present();
  }

  isAdmin(): boolean {
    const user = this.authService.obtenerLocalStorageJson('user');
    return user.rol_id == 1 ? true : false
  }
}
