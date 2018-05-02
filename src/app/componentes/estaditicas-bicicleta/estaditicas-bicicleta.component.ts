import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../servicios/firebase.service';
import { Bicicleta, Viaje } from '../../interfaces/modelos';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-estaditicas-bicicleta',
  templateUrl: './estaditicas-bicicleta.component.html',
  styleUrls: ['./estaditicas-bicicleta.component.css']
})
export class EstaditicasBicicletaComponent implements OnInit {

  bicicleta:Bicicleta={
    idBicicleta:"",
    id :"",
    prestada:null
  };
  viajes:Observable<Viaje[]>

  constructor( private activatedRoute:ActivatedRoute, public _fb:FirebaseService ) {
    this.activatedRoute.params.subscribe(params =>{
       this._fb.bicicletasCollection.doc<Bicicleta>( params['id'] ).snapshotChanges()
        .subscribe(
          (a)=>{
            const data = a.payload.data() as Bicicleta;
            this.bicicleta = data;
            const id = a.payload.id;
            this.bicicleta.id = id;
          }
        )
      this.viajes = this._fb.bicicletasCollection.doc<Bicicleta>(params['id'])
            .collection<Viaje>('viajes').valueChanges();

  })
}



  ngOnInit() {
  }

}
