import { Injectable } from '@angular/core';
import { Lugar } from '../lugares/model/lugar.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {
  API_URL = environment.API_URL;

  constructor(private http:HttpClient) {}

  getLugares(): Observable<Lugar[]>{
    return this.http.get<Lugar[]>(`${this.API_URL}lugar/`, { headers: this.getHeaders() });
  }

  getLugar(id: number): Observable<Lugar>{
    return this.http.get<Lugar>(`${this.API_URL}lugar/${id}`, { headers: this.getHeaders() });
  }

  crearLugar(data: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>(`${this.API_URL}lugar/`, data, { headers: this.getHeaders() });
  }

  actualizarLugar(id: number, lugar: Lugar): Observable<Lugar> {
    return this.http.put<Lugar>(`${this.API_URL}lugar/${id}`, lugar, { headers: this.getHeaders() });
  }

  eliminarLugar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}lugar/${id}`, { headers: this.getHeaders() });
  }

  getHeaders(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-authorization': token ? token : ''
    });
    return headers;
  }

}
