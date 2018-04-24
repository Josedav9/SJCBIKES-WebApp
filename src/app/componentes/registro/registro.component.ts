import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from '../../interfaces/modelos';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuarioCollection:AngularFirestoreCollection<Usuario>;
  usuario:Usuario = {
    nombre:"",
    apellido:"",
    cedula:"",
    fNacimiento:null,
  };
  email:string;
  password:string;
  exito:string;
  sinExito:string;

  constructor( public _fb:FirebaseService, private db:AngularFirestore ) {
    this.usuarioCollection = this.db.collection('usuarios');
   }

   registrar(){
     console.log("entre")
     this._fb.crearUsuario( this.email, this.password  ).then(
       resp => {
         this.usuarioCollection.doc( resp.uid ).set( this.usuario ).then(
           resp => {
             console.log(resp)
             if(resp == undefined){
               this.exito = "Se creo exitosamente"
             }
           }
         )
       }
     ).catch(
       err => {
         console.log("Falle")
         this.sinExito = "No se registro correctamente" + err;
       }
     );
   }

  ngOnInit() {
  }

}
