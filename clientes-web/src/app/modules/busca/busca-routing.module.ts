import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscaAdvogadoComponent } from './busca-advogado/busca-advogado.component';
import { ResultadosComponent } from './resultados/resultados.component';


const routes: Routes = [
  { path: '', redirectTo: 'busca-advogado', pathMatch: 'full' },
  { path: 'busca-advogado', component: BuscaAdvogadoComponent },
  { path: 'resultados', component: ResultadosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscaRoutingModule { }
