import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Empleado } from "src/app/models/empleado.model";
import { EmpleadoService } from "src/services/empleado.service";


@Component({
   selector:'list-empleados',
   templateUrl:'./list-empleados.html',
   styleUrls:['./list-empleados.css']
})

export class ListEmpleadosComponent implements OnInit{
   
   //items: Observable<any[]>;
   empleados: Empleado[]=[];

   
   constructor(private firestore: AngularFirestore,//,private servicio:Router
               private empleadoService:EmpleadoService,private toastr: ToastrService){
                  //Tambien pudiera traerme los empleados de mi base de datos asi
                  //aunque siempre es mejor llamar a un metodo get de un servicio para traerme 
                  //los empleados
                  //this.items = firestore.collection('empleados').valueChanges();
               }

   ngOnInit(): void {

     this.getEmpleados()
   }

   /*goCrearEmpleado(){
     this.servicio.navigate(['create-empleado'])
   }*/

   getEmpleados(){
   
     console.log("ANTES DE LLAMAR A EL SERVICCIO GET-EMPLEADOS")
     console.log(this.empleados)
    
     this.empleadoService.getEmpleados().subscribe(data =>{
        this.empleados=[];
       
        data.map((elem:any) =>{
          
          //console.log(elem.payload.doc.id)  ---> ME MUESTRA EN ID DE TODOS LOS DOCUMENTOS DE MI BD
          //console.log(elem.payload.doc.data()) ---> ME MUESTRA TODOS LOS DOCUMENTOS DE MI BD
          //PRIMERA FORMA: Lo siguiente es una manera de hacerlo 


            const e = new Empleado(
            elem.payload.doc.data().id,
            elem.payload.doc.data().nombre,
            elem.payload.doc.data().apellido,
            elem.payload.doc.data().documento,
            elem.payload.doc.data().salario,
            elem.payload.doc.data().fechaCreacion,
            elem.payload.doc.data().fechaActualizacion)
            this.empleados.push(e)

            //SEGUNDA FORMA: Llo siguiente es otra manera de hacerlo
            //OJO OJO LA SIGUIENTE LINEA ES RECOMENDADA PARA USAR 
            //POSTERIORMENTE EN ELIMINAR Y ACTUALIZAR
            
           // this.empleados.push(elem.payload.doc.data())

          })
          console.log("DESPUES DE LLAMAR A EL SERVICCIO GET-EMPLEADOS")
          console.log(this.empleados)

     })


   }

   eliminarEmpleados(id:string){
    this.empleadoService.eliminarEmpleados(id).then(resp => 
      {
        console.log("Empleado eliminado con exito")
        this.toastr.error('El empleado fue eliminado con exito!!!', 'Registro eliminado',{
          positionClass:'toast-bottom-right'
        })
        console.log("YUJUUUUUU -ESTOY EN ELIMINAR")
        this.getEmpleados()
      }
    ).catch(err => console.log(err))
   }

   actualizarEmpleados(e:Empleado){
    // this.empleadoService.agregarEmpleado(e,id)
    console.log("El empelado selecionado es:")
    console.log(e)
   }
}