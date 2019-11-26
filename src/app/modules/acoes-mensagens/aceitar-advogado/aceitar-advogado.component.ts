import { Component, OnInit } from '@angular/core';
import { MensagensService } from '../services/mensagens.service';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-aceitar-advogado',
  templateUrl: './aceitar-advogado.component.html',
  styleUrls: ['./aceitar-advogado.component.scss']
})
export class AceitarAdvogadoComponent implements OnInit {
  codigoMensagem: string;

  constructor(
    private mensagemService: MensagensService,
    private loadingService: LoadingScreenService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(r => {
      this.codigoMensagem = r.get('codigo');
      this.aceitarAdvogado();
    })
  }

  aceitarAdvogado() {
    this.loadingService.isLoading.next(true);
    this.mensagemService.aceitarAdvogado(this.codigoMensagem).subscribe(r => {
      this.loadingService.isLoading.next(false);
    }, error => {
      this.loadingService.isLoading.next(false);
      this.snackBar.open('Erro ao aceitar escritório!', 'Fechar');
    })
  }
}
