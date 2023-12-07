import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIBusqueda, APITotal, Busqueda } from 'src/app/interfaces/busqueda.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneralService {

  constructor(
    private http: HttpClient
  ) { }


    obtenerBusqueda(busqueda:Busqueda){
      return this.http.post<APIBusqueda[]> ("http://localhost:3001/reporteador", busqueda)
    }

    obtenerTodos(){
      return this.http.get<APIBusqueda[]> ("http://localhost:3001/reporteador")
    }

    obtenerResultadosGenerales(){
      return this.http.get<APITotal> ("http://localhost:3001/reporteador/obtenerSalsas")
    }

}
