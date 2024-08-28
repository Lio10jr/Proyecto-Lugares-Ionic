import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertarPageRoutingModule } from './insertar-routing.module';

import { InsertarPage } from './insertar.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertarPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [InsertarPage]
})
export class InsertarPageModule {}
