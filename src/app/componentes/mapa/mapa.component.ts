import { Component, OnInit } from '@angular/core';
import { Parqueadero, Viaje, Usuario, Bicicleta } from '../../interfaces/modelos';
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
  viaje:Viaje;
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

  actualizarParqueadero(): void{
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
  tomarPrestadaBicicleta( bicicletaId:string, parqueadero:Parqueadero, inx:number ): void{
  this._fb.tomarPrestadaBicicleta( bicicletaId, parqueadero ).then(
      (res) => {
        let viajes:Viaje = {
          idBicicleta:bicicletaId,
          parqueaderoOrigen:parqueadero.nombre,
          horaPrestamo: new Date()
        }
        let usuario:Usuario = JSON.parse(localStorage.getItem('usuario'));
        this._fb.usuarioCollection.doc( usuario.id )
                  .collection('viajes').add( viajes ).then(
                    (resp)=>{
                      usuario.prestada = resp.id;
                      localStorage.setItem('usuario', JSON.stringify(usuario));
                      this._fb.usuarioCollection.doc( usuario.id ).update( usuario );
                    }
                  );
        parqueadero.bicicletas.splice( inx, 1 );
        this._fb.actualizarParqueadero( parqueadero );
      }
    ).catch();
  }

  regresarBicicleta( parqueadero:Parqueadero ):void{
    let usuario =  JSON.parse(localStorage.getItem('usuario'));
    this._fb.usuarioCollection.doc( usuario.id ).collection('viajes').doc<Viaje>( usuario.prestada ).valueChanges()
        .subscribe( resp=>{
          this.viaje = resp;
          this.viaje.horaDevolucion = new Date();
          this.viaje.parqueaderoDestino = parqueadero.nombre;
          this._fb.regresarBicicleta( this.viaje );
          parqueadero.bicicletas.push( this.viaje.idBicicleta );
          this._fb.parqueaderosCollection.doc( parqueadero.id )
                .update( {'bicicletas':parqueadero.bicicletas} );
          this._fb.usuarioCollection.doc( usuario.id ).update( { 'prestada':null } );

        })
        this._fb.usuarioCollection.doc( usuario.id ).collection('viajes').doc( usuario.prestada )
              .update( { 'horaDevolucion': new Date(), 'parqueaderoDestino': parqueadero.nombre  } );


  }

  ngOnInit() {
  }

}
