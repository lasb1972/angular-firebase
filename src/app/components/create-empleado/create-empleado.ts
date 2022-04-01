import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Empleado } from "src/app/models/empleado.model";
import { EmpleadoService } from "src/services/empleado.service";


@Component({
    selector:'create-empleado',
    templateUrl:'./create-empleado.html',
    styleUrls:['create-empleado.css']
})

export class CreateEmpleadoComponent implements OnInit{
    createEmpleado: FormGroup;
    mostrarAlerta: boolean=false;
    spinner:boolean=false;
    indice:string='';

    nombre: string='';
    apellido:string='';
    documento:string='';
    salario:number=0;
    fechaCreacion:Date | undefined ;
    fechaActualizacion:Date | undefined ;

    titulo:string='Agregar Empleados'
    tituloBoton ='Agregar'


    constructor(private fb: FormBuilder, private empleadoService:EmpleadoService,
                private router:Router,private toastr: ToastrService,
                private angularfirestore: AngularFirestore,
                private route: ActivatedRoute,  ){ 
       this.createEmpleado = fb.group({
          nombre:['',Validators.required], 
          apellido:['',Validators.required], 
          documento:['',Validators.required], 
          salario:['',Validators.required], 
          fechaCreacion:['',Validators.required], 
          fechaActualizacion:['',Validators.required] 
       })     
 
    }
    
    ngOnInit(): void {
      this.indice = this.route.snapshot.params['id'];
      console.log("DESDE CREAR EMPLEADO ME ENVIAN ESTO DESDE LISTA DE EMPLEADOS")
      console.log(this.indice)
      if (this.indice!==undefined){
        this.buscarUnSoloEmpleado()
      }
    }



    buscarUnSoloEmpleado(){
         this.titulo="Actualizar Empleado"
         this.tituloBoton="Actualizar"
         this.empleadoService.buscarUnSoloEmpleado(this.indice).subscribe(data =>{
            

           console.log(data.payload.data()['nombre'])

           this.createEmpleado.setValue({   //ESTO HACE QUE SE REFLEJE LA DATA EN EL HTML INMEDIATAMENTE
               nombre:data.payload.data()['nombre'],
               apellido:data.payload.data()['apellido'],
               documento:data.payload.data()['documento'],
               salario:data.payload.data()['salario'],
               fechaActualizacion:data.payload.data()['fechaActualizacion'],
               fechaCreacion:data.payload.data()['fechaCreacion'],
           })

         })
    }


    agregarActualizarEmpleado(){   
     
        console.log(this.createEmpleado)

       // if (this.createEmpleado.status==="INVALID"){  // SI TAN SOLO UNO DE LOS CAMPOS
                                                        // ESTA EN BLANCO EL STATUS SERA INVALIDO
       if (this.createEmpleado.value.nombre==='' ||
           this.createEmpleado.value.apellido ==='' || 
           this.createEmpleado.value.documento ==='' || 
           this.createEmpleado.value.salario === ''
          )   
        {                                                          
           this.mostrarAlerta =  true;  
           this.spinner = false;
        }
        else{
           this.mostrarAlerta =  false;  
           this.spinner = true;
        
          /* const empleado ={
              nombre: this.createEmpleado.value.nombre,
              apellido: this.createEmpleado.value.apellido,
              documento: this.createEmpleado.value.documento,
              salario: this.createEmpleado.value.salario,
              fechaCreacion: new Date(),
              fechaActualizacion: new Date() 
           }*/
           let clave:any ;
           let e:Empleado;

           if (this.indice===undefined){
              //GUARDAR EMPLEADO
              this.agregarEmpleado() 
            }
           else{
            //ACTUALIZAR EMPLEADO
            this.actualizarEmpleado()         
           } 
        }
    }

    agregarEmpleado(){
      let clave:any ;
      let e:Empleado;

      clave= this.angularfirestore.createId();
      e = new Empleado(
         clave, 
         this.createEmpleado.value.nombre,
         this.createEmpleado.value.apellido,
         this.createEmpleado.value.documento,
         this.createEmpleado.value.salario,
         new Date(),    //POR SER CREACION(primer a vez) A JURO GUARDO CON DATE
         new Date()     //POR SER CREACION(primera vez) A JURO GUARDO CON DATE
      )
      console.log(e)

      this.empleadoService.agregarEmpleado(e,clave).then(() =>{
          //console.log("Se ha registrado el empleado")
          this.toastr.success('El empleado fue registrado con exito!!!', 'Empleado registrado',{
          positionClass:'toast-bottom-right'
          })
          this.router.navigate(['/list-empleados'])
       
      }).catch(error  => console.log(error))
    }

    actualizarEmpleado(){
      let clave:any ;
      let e:Empleado;

      clave=this.indice
      console.log("VOY A ACTUALIZAR")
      console.log("mi fecha de creacion anterior es: "+this.createEmpleado.value.fechaCreacion)
     
      e = new Empleado(
         clave, 
         this.createEmpleado.value.nombre,
         this.createEmpleado.value.apellido,
         this.createEmpleado.value.documento,
         this.createEmpleado.value.salario,
         this.createEmpleado.value.fechaCreacion, // MANTENGO MI FECHA DE CREACION ORIGINAL
         new Date()  // ACA SI MODIFICO MI FECHA DE ACTUALIZACION CON DATE
      )

      console.log(e)

      this.empleadoService.actualizarEmpleado(e,clave).then(() =>{
         //console.log("Se ha registrado el empleado")
         this.toastr.info('El empleado fue actualizado con exito!!!', 'Empleado actualizado',{
         positionClass:'toast-bottom-right'
         })
         this.router.navigate(['/list-empleados'])    
      }).catch(error  => console.log(error))

    }

}