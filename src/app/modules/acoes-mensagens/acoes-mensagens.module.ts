import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcoesMensagensRoutingModule } from './acoes-mensagens-routing.module';
import { AceitarAdvogadoComponent } from './aceitar-advogado/aceitar-advogado.component';
import { ReativarMensagemComponent } from './reativar-mensagem/reativar-mensagem.component';
import { RemoverMensagemComponent } from './remover-mensagem/remover-mensagem.component';


@NgModule({
  declarations: [AceitarAdvogadoComponent, ReativarMensagemComponent, RemoverMensagemComponent],
  imports: [
    CommonModule,
    AcoesMensagensRoutingModule
  ]
})
export class AcoesMensagensModule { }
