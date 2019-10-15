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
    });
  }

  showButtons() {
    const filterButtons = document.querySelector('.filter-buttons');
    filterButtons.classList.toggle('show');
  }

}
