import { logging } from 'protractor';
import { Escritorio } from './../../../shared/models/escritorio.model';
import { ClientesService } from './../../../shared/services/clientes.service';
import { Component, OnInit } from '@angular/core';
import * as InlogMaps from '@inlog/inlog-maps/lib';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  private maps: InlogMaps.Map;
  private escritorios: Escritorio[];

  constructor(
    private clientesService: ClientesService
  ) { }

  ngOnInit() {
    this.maps = new InlogMaps.Map();
    this.maps.initialize(InlogMaps.MapType.Google, {
      apiKey: 'AIzaSyCL-6vOejsS5QLc6_XI8qlvjnr6f5m6-d8',
      gestureHandling: false
    }).then(() => {
      // adicionar carregamentos e eventos do mapa aqui
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

  plotarMarcadorEscritorio(escritorio: Escritorio) {
    this.maps.drawMarker(escritorio.codigo, {
      addToMap: true,
      latlng: [escritorio.latitude, escritorio.longitude],
      icon: new InlogMaps.MarkerIcon('assets/images/owl-red-marker.svg', [30, 30]),
    });
  }

  adicionarCliqueMarker(escritorio: Escritorio) {
    this.maps.addMarkerEvent(escritorio.codigo, InlogMaps.MarkerEventType.Click, () => {
      // TO-DO: Abrir modal com dados do escritório e campo para enviar uma mensagem
    });
  }

  adicionarHoverMarker(escritorio: Escritorio) {
    this.maps.addMarkerEvent(escritorio.codigo, InlogMaps.MarkerEventType.MouseOver, () => {
      // TO-DO: Corrigir problema de posição do Popup a partir da segunda exibição
      this.maps.drawPopup(`popup-${escritorio.codigo}`, {
        latlng: [escritorio.latitude, escritorio.longitude],
        marker: escritorio.codigo,
        content: `<strong>Escritório:</strong> ${escritorio.razaoSocial} <br/>${escritorio.endereco}`
      });

      this.maps.removeMarkerEvent(escritorio.codigo, InlogMaps.MarkerEventType.MouseOver);
    });
  }

  adicionarOutMarker(escritorio: Escritorio) {
    this.maps.addMarkerEvent(escritorio.codigo, InlogMaps.MarkerEventType.MouseOut, () => {
      this.maps.closePopup(`popup-${escritorio.codigo}`);
      this.adicionarHoverMarker(escritorio);
    });
  }

  showButtons() {
    const filterButtons = document.querySelector('.filter-buttons');
    filterButtons.classList.toggle('show');
  }
}
