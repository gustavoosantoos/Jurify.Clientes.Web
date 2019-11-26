import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AceitarAdvogadoComponent } from './aceitar-advogado/aceitar-advogado.component';
import { ReativarMensagemComponent } from './reativar-mensagem/reativar-mensagem.component';
import { RemoverMensagemComponent } from './remover-mensagem/remover-mensagem.component';


const routes: Routes = [
  { path: 'aceitar-advogado/:codigo', component: AceitarAdvogadoComponent },
  { path: 'reativar-mensagem/:codigo', component: ReativarMensagemComponent },
  { path: 'remover-mensagem/:codigo', component: RemoverMensagemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcoesMensagensRoutingModule { }
