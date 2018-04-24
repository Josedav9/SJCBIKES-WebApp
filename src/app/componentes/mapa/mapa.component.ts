import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Parqueadero } from '../../interfaces/modelos';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat: number = 4.6255594;
  lng: number = -74.1387344;
  zoom:number = 12;

  parqueaderosSnap:Observable<Parqueadero[]>

  parqueaderoSelecionado:Parqueadero;
  parqueaderoModal:Parqueadero={
    nombre:"",
    lat:null,
    lng:null,
    bicicletas:[]
  };
  exito:boolean = false;

  constructor( public _fb:FirebaseService  ) {
    this.parqueaderosSnap = _fb.parqueaderosCollection.snapshotChanges()
                .map(actions => {
                  return actions.map(a => {
                    const data = a.payload.doc.data() as Parqueadero;
                    const id = a.payload.doc.id;
                    return { id, ...data};
                  });
                });
  }

  crearMarcador(evento:any): void{
    let parqueadero:Parqueadero ={
      lat:evento.coords.lat,
      lng:evento.coords.lng,
      nombre:"",
      bicicletas:[]
    }
    this._fb.crearParqueadero( parqueadero ).then(
      resp =>{
        console.log(resp)
      }
    ).catch(
      err =>{
        console.log(err)
      }
    )
  }

  eliminarMarcador(parqueadero:Parqueadero):void{
    this._fb.eliminarParqueadero( parqueadero ).then(
      resp =>{
        console.log(resp)
      }
    ).catch(
      (err) =>{
        console.error(err)
      }
    )
  }

  actualizarParqueadero(){
    this._fb.actualizarParqueadero( this.parqueaderoModal ).then(
      resp =>{
        this.exito = true
      }
    ).catch(
      err =>{
        console.log(err)
      }
    )
  }

  ngOnInit() {
  }

}
