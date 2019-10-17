import { logging } from 'protractor';
import { Escritorio } from './../../../shared/models/escritorio.model';
import { ClientesService } from './../../../shared/services/clientes.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import * as InlogMaps from '@inlog/inlog-maps/lib';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  protected tipoMapa: InlogMaps.MapType = InlogMaps.MapType.Google;
  protected maps: InlogMaps.Map;
  protected escritorios: Escritorio[];
  protected escritorioSelecionado: Escritorio;

  @ViewChild('templateEscritorio', { static: true })
  templateEscritorio: TemplateRef<any>;

  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.maps = new InlogMaps.Map();
    this.maps.initialize(this.tipoMapa, {
      apiKey: 'AIzaSyCL-6vOejsS5QLc6_XI8qlvjnr6f5m6-d8',
      gestureHandling: false
    }).then(() => {
      this.clientesService.obterEscritorios().subscribe(r => {
        this.escritorios = r;
        this.escritorios.forEach(e => {
          this.plotarMarcadorEscritorio(e);
          this.adicionarCliqueMarker(e);
          this.adicionarHoverMarker(e);
          this.adicionarOutMarker(e);
        });
      });
    });
  }

  plotarMarcadorEscritorio(escritorio: Escritorio): void {
    const icon = new InlogMaps.MarkerIcon(
      'assets/images/owl-red-marker.svg',
      this.tipoMapa === InlogMaps.MapType.Leaflet ? [30, 30] : null
    );

    this.maps.drawMarker(escritorio.codigo, {
      addToMap: true,
      latlng: [escritorio.latitude, escritorio.longitude],
      icon: icon,
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

  }

  showButtons(): void {
    const filterButtons = document.querySelector('.filter-buttons');
    filterButtons.classList.toggle('show');
  }
}
