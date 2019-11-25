import { LoadingScreenService } from './../../../shared/services/loading-screen.service';
import { logging } from 'protractor';
import { Escritorio } from './../../../shared/models/escritorio.model';
import { ClientesService } from './../../../shared/services/clientes.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import * as InlogMaps from '@inlog/inlog-maps/lib';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NovaMensagem } from 'src/app/shared/models/nova-mensagem.model';
import { Especialidade } from 'src/app/shared/models/especialidade.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  tipoMapa: InlogMaps.MapType = InlogMaps.MapType.Google;
  maps: InlogMaps.Map;

  especialidades: Especialidade[];
  especialidadeAtual: Especialidade;

  escritorios: Escritorio[];
  escritorioSelecionado: Escritorio;

  novaMensagemNome: string;
  novaMensagemCpf: string;
  novaMensagemContato: string;
  novaMensagemTexto: string;

  novoCasoNome: string;
  novoCasoCpf: string;
  novoCasoContato: string;
  novoCasoTexto: string;

  @ViewChild('templateEscritorio', { static: true })
  templateEscritorio: TemplateRef<any>;

  @ViewChild('templateMensagemEscritorio', { static: true })
  templateMensagem: TemplateRef<any>;

  @ViewChild('templateCasoJuridico', { static: true })
  templateCasoJuridico: TemplateRef<any>;

  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private loadingService: LoadingScreenService
  ) { }

  ngOnInit() {
    const lat = Number.parseFloat(this.activatedRoute.snapshot.params.latitude);
    const lng = Number.parseFloat(this.activatedRoute.snapshot.params.longitude);

    if (!lat || !lng) {
      this.router.navigateByUrl('/busca/busca-advogados');
      return;
    }

    this.maps = new InlogMaps.Map();
    this.maps.initialize(this.tipoMapa, {
      apiKey: 'AIzaSyCL-6vOejsS5QLc6_XI8qlvjnr6f5m6-d8',
      gestureHandling: false
    }).then(() => {
      this.maps.setCenter([lat, lng]);
      this.maps.setZoom(12);
      this.plotarMarcadorUsuario([lat, lng]);

      this.loadingService.isLoading.next(true);

      this.clientesService.obterEspecialidades().subscribe(r => {
        this.especialidades = r;
      });

      this.clientesService.obterEscritorios().subscribe(r => {
        this.escritorios = r;
        this.escritorios.forEach(e => {
          this.plotarMarcadorEscritorio(e);
          this.adicionarCliqueMarker(e);
          this.adicionarHoverMarker(e);
          this.adicionarOutMarker(e);
        });
      }, err => {
        this.snackBar.open('Falha ao carregar escritórios', 'Fechar');
      }, () => {
        this.loadingService.isLoading.next(false);
      });
    });
  }

  selecionarEspecialidade(codigo: string): void {
    if (codigo == null) {
      this.especialidadeAtual = null;
      this.escritorios.forEach(e => this.maps.toggleMarkers(true, e.codigo));
    } else {

      this.especialidadeAtual = this.especialidades.find(e => e.codigo === codigo);
      this.escritorios.forEach(e => this.maps.toggleMarkers(false, e.codigo));

      this.escritorios
          .filter(e => e.especialidades.some(es => es.codigo === codigo))
          .forEach(e => this.maps.toggleMarkers(true, e.codigo));
    }
  }

  plotarMarcadorUsuario(coordenadas: number[]): void {
    this.maps.drawMarker('usuario', {
      addToMap: true,
      draggable: false,
      latlng: coordenadas,
      icon: new InlogMaps.MarkerIcon('assets/images/male-user.svg')
    });

    this.maps.addMarkerEvent('usuario', InlogMaps.MarkerEventType.MouseOver, () => {
      this.maps.drawPopup('usuario', {
        content: '<strong>Sua posição aproximada</strong>',
        latlng: coordenadas,
        marker: 'usuario'
      });
    });

    this.maps.addMarkerEvent('usuario', InlogMaps.MarkerEventType.MouseOut, () => {
      this.maps.closePopup('usuario');
    });
  }

  plotarMarcadorEscritorio(escritorio: Escritorio): void {
    const icone = new InlogMaps.MarkerIcon(
      'assets/images/owl-red-marker.svg',
      this.tipoMapa === InlogMaps.MapType.Leaflet ? [30, 30] : null
    );

    this.maps.drawMarker(escritorio.codigo, {
      addToMap: true,
      latlng: [escritorio.latitude, escritorio.longitude],
      icon: icone,
      addClusterer: false,
      fitBounds: false,
      draggable: false
    });
  }

  adicionarCliqueMarker(escritorio: Escritorio): void {
    this.maps.addMarkerEvent(escritorio.codigo, InlogMaps.MarkerEventType.Click, () => {
      // TO-DO: Abrir modal com dados do escritório e campo para enviar uma mensagem
      this.escritorioSelecionado = escritorio;
      this.dialog.open(this.templateEscritorio);
    });
  }

  adicionarHoverMarker(escritorio: Escritorio): void {
    this.maps.addMarkerEvent(escritorio.codigo, InlogMaps.MarkerEventType.MouseOver, () => {
      this.maps.drawPopup(escritorio.codigo, {
        latlng: [escritorio.latitude, escritorio.longitude],
        marker: escritorio.codigo,
        content: `<strong>Escritório:</strong> ${escritorio.razaoSocial} <br/>${escritorio.endereco}`
      });
    });
  }

  adicionarOutMarker(escritorio: Escritorio): void {
    this.maps.addMarkerEvent(escritorio.codigo, InlogMaps.MarkerEventType.MouseOut, () => {
      this.maps.closePopup(escritorio.codigo);
    });
  }

  fecharModalEscritorio(): void {
    this.dialog.closeAll();
  }

  abrirModalContatoEscritorio(): void {
    this.fecharModalEscritorio();
    this.dialog.open(this.templateMensagem);
  }

  fecharModalMensagem(): void {
    this.dialog.closeAll();
  }

  enviarMensagemEscritorio(): void {
    if (!this.validarFormularioNovaMensagem()) {
      this.snackBar.open('Preencha todos os campos do formulário', 'Fechar');
      return;
    }

    const novaMensagem: NovaMensagem = {
      nome: this.novaMensagemNome,
      cpf: this.novaMensagemCpf,
      contato: this.novaMensagemContato,
      mensagem: this.novaMensagemTexto
    };

    this.loadingService.isLoading.next(true);
    this.clientesService.enviarMensagemEscritorio(this.escritorioSelecionado, novaMensagem).subscribe(r => {
      this.snackBar.open('Mensagem enviada com sucesso, aguarde o contato do escritório.', 'Fechar');
    }, err => {
      this.snackBar.open('Falha ao enviar mensagem, tente novamente.', 'Fechar');
    }, () => {
      this.dialog.closeAll();
      this.loadingService.isLoading.next(false);
    });
  }

  validarFormularioNovaMensagem(): boolean {
    if (!this.novaMensagemNome || !this.novaMensagemCpf || !this.novaMensagemContato || !this.novaMensagemTexto) {
      return false;
    }

    return true;
  }

  validarFormularioCasoJuridico(): boolean {
    if (!this.novoCasoNome || !this.novoCasoCpf || !this.novoCasoContato || !this.novoCasoTexto) {
      return false;
    }

    return true;
  }

  abrirModalCadastroCasoJuridico(): void {
    this.dialog.open(this.templateCasoJuridico);
  }

  salvarCasoJuridico(): void {
    if (!this.validarFormularioCasoJuridico()) {
      this.snackBar.open('Preencha todos os campos do formulário', 'Fechar');
      return;
    }

    const novaMensagem: NovaMensagem = {
      nome: this.novoCasoNome,
      cpf: this.novoCasoCpf,
      contato: this.novoCasoContato,
      mensagem: this.novoCasoTexto
    };

    this.loadingService.isLoading.next(true);
    this.clientesService.enviarMensagemPublica(novaMensagem).subscribe(r => {
      this.snackBar.open('Mensagem enviada com sucesso, aguarde o contato do escritório.', 'Fechar');
    }, err => {
      this.snackBar.open('Falha ao enviar mensagem, tente novamente.', 'Fechar');
    }, () => {
      this.dialog.closeAll();
      this.loadingService.isLoading.next(false);
    });
  }

  showButtons(): void {
    const filterButtons = document.querySelector('.filter-buttons');
    filterButtons.classList.toggle('show');
  }
}
