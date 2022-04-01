import { Component, NgModule } from '@angular/core';

//COMPONENTES
import { AppComponent } from './app.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados';
import { NavbarComponent } from './components/navbar/navbar';
import { PaginaErrorComponent } from './components/pagina-error/pagina-error';

//MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from 'src/services/empleado.service';
import { ToastrModule } from 'ngx-toastr';

const routes:Routes=[
  //{path:'',redirectTo:'create-empleado',pathMatch:'full'},
  {path:'',component:ListEmpleadosComponent},
  {path:'create-empleado',component:CreateEmpleadoComponent},
  {path:'actualizar-empleado/:id',component:CreateEmpleadoComponent},
  {path:'list-empleados',component:ListEmpleadosComponent},
  {path:'**',component: PaginaErrorComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    CreateEmpleadoComponent, 
    ListEmpleadosComponent,
    NavbarComponent,
    PaginaErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,   // PARA VALIDAR FORMULARIOS
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [EmpleadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
