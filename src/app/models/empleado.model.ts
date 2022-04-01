

export class Empleado{
   id:string='';
   nombre: string='';
   apellido:string='';
   documento:string='';
   salario:number=0;
   fechaCreacion: any;
   fechaActualizacion:any

   constructor(id:string,nombre:string,apellido:string,documento:string,
               salario:number,fechaCreacion:Date, fechaActualizacion:Date){
     this.id=id
     this.nombre=nombre;
     this.apellido=apellido;
     this.documento=documento;
     this.salario=salario;
     this.fechaCreacion=fechaCreacion;
     this.fechaActualizacion=fechaActualizacion;
   }
}