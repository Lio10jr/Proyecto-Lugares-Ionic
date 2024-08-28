import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = environment.API_URL;
  
  constructor(private http:HttpClient) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  userLogin(data: any){
    return this.http.post(`${this.API_URL}usuario/login`,data);
  }

  userRegister(data: any){
    return this.http.post(`${this.API_URL}usuario/registro`, data);
  }

  obtenerLocalStorageJson(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }
}
