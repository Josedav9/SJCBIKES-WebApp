import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './componentes/perfil/perfil.component'
import { RegistroComponent } from './componentes/registro/registro.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { EstaditicasComponent } from './componentes/estaditicas/estaditicas.component';
import { EstaditicasBicicletaComponent } from './componentes/estaditicas-bicicleta/estaditicas-bicicleta.component';

const APP_ROUTES: Routes = [
  { path: 'inicio', component: PerfilComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'estadisticas', component: EstaditicasComponent },
  { path: 'estadisticas/bicicleta/:id', component: EstaditicasBicicletaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
