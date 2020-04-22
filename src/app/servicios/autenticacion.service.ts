import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../modelo/usuario-modelo';
import { RespuestaAutenticacion } from '../modelo/respuesta-autenticacion';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  constructor(private http: HttpClient) {}

  iniciarSesion(usuario: Usuario): Observable<RespuestaAutenticacion> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<RespuestaAutenticacion>(
      `${environment.url_autenticacion}`,
      usuario,
      {
        headers,
      }
    );
  }
}
