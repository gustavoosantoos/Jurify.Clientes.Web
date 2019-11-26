import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/busca/busca-advogado', pathMatch: 'full' },
  { path: 'busca', loadChildren: () => import('./modules/busca/busca.module').then(m => m.BuscaModule) },
  { path: 'acoes-mensagens', loadChildren: () => import('./modules/acoes-mensagens/acoes-mensagens.module').then(m => m.AcoesMensagensModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
