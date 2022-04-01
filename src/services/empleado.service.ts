import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Empleado } from "src/app/models/empleado.model";


@Injectable()

export class EmpleadoService{

 constructor(private angularfirestore: AngularFirestore){}

   actualizarEmpleado(empleado:Empleado,id:string):Promise<any>{  
         
      const data = {...empleado}
      //return this.angularfirestore.collection('empleados').add(data);
      return this.angularfirestore.collection('empleados').doc(id).update(data);
   }

    agregarEmpleado(empleado:Empleado,id:string):Promise<any>{
 
       
       const data = {...empleado}
       //return this.angularfirestore.collection('empleados').add(data);
       return this.angularfirestore.collection('empleados').doc(id).set(data);
    }

    getEmpleados():Observable<any>{
       return this.angularfirestore.collection('empleados',
       ref=>ref.orderBy('fechaCreacion','asc') // esta instruccion es para que 
                                               // mis registros se muestren de manera ascendente
                                               // por el campo 'fechaCreacion'
       ).snapshotChanges();

    }

    eliminarEmpleados(id:string):Promise<any>{
      return this.angularfirestore.collection('empleados').doc(id).delete();
    }

    buscarUnSoloEmpleado(id: string):Observable<any>{
      return this.angularfirestore.collection('empleados').doc(id).snapshotChanges()
    }
 
}