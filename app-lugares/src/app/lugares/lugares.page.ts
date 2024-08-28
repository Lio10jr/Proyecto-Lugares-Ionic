import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lugar } from './model/lugar.model';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.page.html',
  styleUrls: ['./lugares.page.scss'],
})
export class LugaresPage implements OnInit {

  ListaLugares!: Lugar[];

  constructor(
    private lServ: LugaresService,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.lServ.getLugares().subscribe(
      result => {
        this.ListaLugares =  result;
      }
    );
  }

  ionViewWillEnter() {
    this.lServ.getLugares().subscribe(
      result => {
        this.ListaLugares =  result;
      }
    );
  }

  PaginaInsertarLugar() {
    this.router.navigate(['/insertar']);
  }

  async logout() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }

  isAdmin(): boolean {
    const user = this.authService.obtenerLocalStorageJson('user');
    return user.rol_id == 1 ? true : false
  }
}
