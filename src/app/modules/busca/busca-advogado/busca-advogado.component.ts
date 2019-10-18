import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busca-advogado',
  templateUrl: './busca-advogado.component.html',
  styleUrls: ['./busca-advogado.component.scss']
})
export class BuscaAdvogadoComponent implements OnInit {

  constructor(
    private geolocService: GeolocationService,
    private router: Router
  ) { }

  geoloc = null;
  permitiuLocalizacao = false;
  address: string;
  latitude: number;
  longitude: number;

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.permitiuLocalizacao = true;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.geolocService.getAddress(this.latitude, this.longitude).subscribe(geo => {
          this.geoloc = geo.valueOf();
          this.address = this.geoloc.results[0].formatted_address;
          this.buscarEndereco();
        });
      });
    }
  }

  buscarEndereco(): void {
    if (this.latitude && this.longitude && this.permitiuLocalizacao) {
      this.router.navigateByUrl('/busca/resultados/' + this.latitude + '/' + this.longitude);
    } else {
      this.geolocService.getCoordinates(this.address).subscribe(r => {
        this.geoloc = r.valueOf();
        this.latitude = this.geoloc.results[0].geometry.location.lat;
        this.longitude = this.geoloc.results[0].geometry.location.lng;

        this.router.navigateByUrl('/busca/resultados/' + this.latitude + '/' + this.longitude);
      });
    }
  }
}
