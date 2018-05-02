import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

//Componentes
import { AppComponent } from './app.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NavbarComponent } from './compartidos/navbar/navbar.component';
import { FooterComponent } from './compartidos/footer/footer.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';


//Servicios
import { FirebaseService } from './servicios/firebase.service';
import { AgmCoreModule } from '@agm/core';

//Rutas
import { APP_ROUTING } from './app.routes';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { EstaditicasComponent } from './componentes/estaditicas/estaditicas.component';
import { EstaditicasBicicletaComponent } from './componentes/estaditicas-bicicleta/estaditicas-bicicleta.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PerfilComponent,
    RegistroComponent,
    MapaComponent,
    EstaditicasComponent,
    EstaditicasBicicletaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBLNUZ79p5RUKzuKDAI_QUU2CjZb9H7jGw'
    })
  ],
  providers: [
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
