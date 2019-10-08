import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscaAdvogadoComponent } from './busca-advogado/busca-advogado.component';


const routes: Routes = [
  { path: '', redirectTo: 'busca-advogado', pathMatch: 'full' },
  { path: 'busca-advogado', component: BuscaAdvogadoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BuscaRoutingModule { }
