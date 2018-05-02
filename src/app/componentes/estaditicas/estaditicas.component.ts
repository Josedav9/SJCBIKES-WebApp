import { Component, OnInit } from '@angular/core';
import { Viaje, Bicicleta, Usuario  } from '../../interfaces/modelos';
import { FirebaseService } from '../../servicios/firebase.service';
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router';

@Component({
  selector: 'app-estaditicas',
  templateUrl: './estaditicas.component.html',
  styleUrls: ['./estaditicas.component.css']
})
export class EstaditicasComponent implements OnInit {

  bicicletas:Observable<Bicicleta[]>
  constructor( public _fb:FirebaseService, private router:Router) {
    this.bicicletas =  this._fb.bicicletasCollection.snapshotChanges()
                .map(actions => {
                  return actions.map(a => {
                    const data = a.payload.doc.data() as Bicicleta;
                    const id = a.payload.doc.id;
                    return { id, ...data};
                  });
                });
  }
  verBicicleta(id:string){
    console.log(id);
    this.router.navigate( ['estadisticas/bicicleta/',id] );
  }
  ngOnInit() {
  }

}
