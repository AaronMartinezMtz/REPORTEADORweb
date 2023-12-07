import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'src/services/service-general.service';
import { APIBusqueda, Busqueda } from './interfaces/busqueda.interface';
import { SortEvent } from 'primeng/api';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reporteadorBootstrap';
  products: APIBusqueda[] = [];

    nombre=  ''
    fecha= ''
    precio:any

    all :APIBusqueda[] = [];

    basicData: any;

    basicOptions: any;

    arandano=0
    cacahuate=0
    habanero=0
    arbol=0
    ajonjoli=0
    total=0

    busquedaTest: Busqueda = {nombre:"habanero"}

    constructor(private serviceGeneralService: ServiceGeneralService) {}

    ngOnInit() {

        this.getallSalsas()
        // this.getall()

        this.serviceGeneralService.obtenerTodos().subscribe(
          resp=>{
  
            let habanero_help=0
            let arbol_help=0
            let ajonjoli_help=0
            let arandano_help=0
            let cacahuate_help=0
  
            resp.forEach(element => {
              if(element.nombre=='arandano')arandano_help+=1
              if(element.nombre=='habanero')habanero_help+=1
              if(element.nombre=='ajonjoli')ajonjoli_help+=1
              if(element.nombre=='arbol')arbol_help+=1
              if(element.nombre=='cacahuate')cacahuate_help+=1
  
  
            });
  
  
             this.habanero=habanero_help
             this.arbol= arbol_help
             this.ajonjoli= ajonjoli_help
             this.arandano= arandano_help
             this.cacahuate= cacahuate_help
             this.all = resp;

             const documentStyle = getComputedStyle(document.documentElement);
             const textColor = documentStyle.getPropertyValue('--text-color');
             const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
             const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
     
             this.basicData = {
                 labels: ['arandano', 'cacahuate', 'habanero', 'arbol','ajonjoli'],
                 datasets: [
                     {
                         label: 'Ventas',
                         data: [this.arandano, this.cacahuate, this.habanero, this.arbol, this.ajonjoli],
                         backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                         borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)','rgb(153, 102, 255)'],
                         borderWidth: 1
                     }
                 ]
             };
     
             this.basicOptions = {
                 plugins: {
                     legend: {
                         labels: {
                             color: textColor
                         }
                     }
                 },
                 scales: {
                     y: {
                         beginAtZero: true,
                         ticks: {
                             color: textColorSecondary
                         },
                         grid: {
                             color: surfaceBorder,
                             drawBorder: false
                         }
                     },
                     x: {
                         ticks: {
                             color: textColorSecondary
                         },
                         grid: {
                             color: surfaceBorder,
                             drawBorder: false
                         }
                     }
                 }
             };
         

          }
        )

        this.serviceGeneralService.obtenerBusqueda(this.busquedaTest).subscribe(
          resp=>{
            this.products = resp;

            console.log(resp);
            

          }
        )

        
    }


    buscar(){
      
      let body = { nombre: this.nombre, fecha: this.fecha, precio: this.precio  }
    
      this.serviceGeneralService.obtenerBusqueda(body).subscribe(
        resp=>{
          this.products = resp;
          console.log(resp);
          

        }
      )

    }

    getallSalsas(){

      this.serviceGeneralService.obtenerResultadosGenerales().subscribe(
        resp => {

          this.arandano= resp.arandano
          this.cacahuate= resp.cacahuate
          this.habanero= resp.habanero
          this.arbol= resp.arbol
          this.ajonjoli= resp.ajonjoli
          this.total = resp.total

        }
      )

    }


    customSort(event: SortEvent) {
        event.data!.sort((data1:any, data2:any) => {
            let value1 = data1[event.field!];
            let value2 = data2[event.field!];
            let result = null;

            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order! * result;
        });
    }
}
