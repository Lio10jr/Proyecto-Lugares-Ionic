import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.authService.obtenerLocalStorageJson('user');
      return new Promise(async (resolve) => {
      if (user.rol_id === 1) {
        return resolve(true);
      } else {
        this.router.navigate(['/lugares']);
        return resolve(false);
      }
    });
  }
}
