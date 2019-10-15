import { Component, OnInit } from '@angular/core';
import * as InlogMaps from '@inlog/inlog-maps/lib';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  private maps: InlogMaps.Map;

  constructor(
  ) { }

  ngOnInit() {
    this.maps = new InlogMaps.Map();
    this.maps.initialize(InlogMaps.MapType.Google, {
      apiKey: 'AIzaSyCL-6vOejsS5QLc6_XI8qlvjnr6f5m6-d8',
      gestureHandling: false
    }).then(() => {
      // adicionar carregamentos e eventos do mapa aqui
      this.maps.drawMarker('marker1', {
        icon: new InlogMaps.MarkerIcon('/assets/images/owl-red-marker.svg', [30, 30]),
        latlng: [-25.441105, -49.276855],
        addToMap: true
      });
      
      this.maps.drawMarker('marker2', {
        icon: new InlogMaps.MarkerIcon('/assets/images/owl-red-marker.svg', [30, 30]),
        latlng: [-25.461105, -49.226855],
        addToMap: true
      });
      
      this.maps.drawMarker('marker2', {
        icon: new InlogMaps.MarkerIcon('/assets/images/owl-red-marker.svg', [30, 30]),
        latlng: [-25.421105, -49.306855],
        addToMap: true
      });
    });
  }

  showButtons() {
    const filterButtons = document.querySelector('.filter-buttons');
    filterButtons.classList.toggle('show');
  }

}
