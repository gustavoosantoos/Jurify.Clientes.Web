import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosComponent } from './resultados/resultados.component';
import { BuscaRoutingModule } from './busca-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuscaAdvogadoComponent } from './busca-advogado/busca-advogado.component';



@NgModule({
  declarations: [ResultadosComponent, BuscaAdvogadoComponent],
  imports: [
    CommonModule,
    BuscaRoutingModule,
    SharedModule
  ]
})
export class BuscaModule { }
