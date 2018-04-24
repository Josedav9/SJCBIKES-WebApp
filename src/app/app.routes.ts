import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './componentes/perfil/perfil.component'
import { RegistroComponent } from './componentes/registro/registro.component';
import { MapaComponent } from './componentes/mapa/mapa.component';

const APP_ROUTES: Routes = [
  { path: 'inicio', component: PerfilComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mapa', component: MapaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
