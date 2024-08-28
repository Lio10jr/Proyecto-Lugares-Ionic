import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'lugares',
    children:[
      {
        path: '',
        loadChildren: () => import('./lugares/lugares.module').then( m => m.LugaresPageModule)
      },
      {
        path: ':LugarId',
        loadChildren: () => import('./lugares/detalle/detalle.module').then( m => m.DetallePageModule)
      },

    ],
    canActivate: [AuthGuard]   
  },
  {
    path :'insertar',
    loadChildren: () => import('./lugares/insertar/insertar.module').then (m=> m.InsertarPageModule),
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path :'modificar/:lugarId',
    loadChildren: () => import('./lugares/modificar/modificar.module').then (m=> m.ModificarPageModule),
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
