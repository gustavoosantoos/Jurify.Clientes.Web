import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/busca-advogado', pathMatch: 'full' },
  { path: 'busca-advogado', loadChildren: () => import('./modules/busca/busca.module').then(m => m.BuscaModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
