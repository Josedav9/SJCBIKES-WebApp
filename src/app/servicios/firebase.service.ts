import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario, Parqueadero } from '../interfaces/modelos';

@Injectable()
export class FirebaseService {

  usuarioCollection:AngularFirestoreCollection<Usuario>;
  parqueaderosCollection:AngularFirestoreCollection<Parqueadero>;

  constructor( public fauth:AngularFireAuth, private db:AngularFirestore ) {
    this.usuarioCollection = this.db.collection('usuarios')
    this.parqueaderosCollection = this.db.collection('parqueaderos')
  }

  crearUsuario(email:string, password:string):Promise<any>{
    return this.fauth.auth.createUserWithEmailAndPassword(email, password)
  }

  login( email:string, password:string ):Promise<any> {
    return this.fauth.auth.signInWithEmailAndPassword(email, password)
  }

  logout():void{
    this.fauth.auth.signOut().then(
      resp => {
        localStorage.removeItem('usuario');
      }
    );
  }

  guardarDatos( usuario:Usuario ):Promise<any>{
    return this.usuarioCollection.doc( usuario.id ).update( usuario );
  }

  crearParqueadero( parqueadero:Parqueadero ):Promise<any>{
    return this.parqueaderosCollection.add( parqueadero )
  }

  eliminarParqueadero( parqueadero:Parqueadero ):Promise<any> {
    return this.parqueaderosCollection.doc( parqueadero.id ).delete()
  }

  actualizarParqueadero( parqueadero:Parqueadero ):Promise<any>{
    return this.parqueaderosCollection.doc( parqueadero.id ).update( parqueadero );
  }

}
