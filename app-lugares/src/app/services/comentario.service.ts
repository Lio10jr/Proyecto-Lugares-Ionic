import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comentario } from '../lugares/model/comentario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  API_URL = environment.API_URL;

  constructor(private http:HttpClient) {}

  getComentarios(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URL}comentario/`, { headers: this.getHeaders() });
  }

  getComentariosbyId(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URL}comentario/${id}`, { headers: this.getHeaders() });
  }

  addComentario(data: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.API_URL}comentario/`, data, { headers: this.getHeaders() });
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
