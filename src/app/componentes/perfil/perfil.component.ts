import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/modelos';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseService } from '../../servicios/firebase.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  email:string;
  password:string;
  usuario:Observable<Usuario>;
  usuarioCambio:Usuario = {
    nombre:"",
    apellido:"",
    id:"",
    fNacimiento:null,
    cedula:null
  };

  constructor(private router:Router, public _fb:FirebaseService, private db:AngularFirestore ) {

   }

  ngOnInit() {
  }

  iniciarSesion():void{
    this._fb.login(this.email, this.password).then(
      login =>{
        this.usuario = this.db.doc<Usuario>(`usuarios/${ login.uid }`).valueChanges()
        this.usuario.subscribe(
          resp =>{
            this.usuarioCambio = resp;
            this.usuarioCambio.id = login.uid;
            localStorage.setItem('usuario', JSON.stringify( this.usuarioCambio ));
          }
        )
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }

  registrar():void{
    this.router.navigate( ['registro'] );
  }

  sesionIniciada():boolean{
    if(localStorage.getItem('usuario') == null){
      return false
    }else{
      this.usuarioCambio = JSON.parse(localStorage.getItem('usuario'))
      return true;
    }
  }

  actualizarDatos():void{
    this._fb.guardarDatos( this.usuarioCambio )
  }

}
