import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';

@Component({
  selector: 'app-busca-advogado',
  templateUrl: './busca-advogado.component.html',
  styleUrls: ['./busca-advogado.component.scss']
})
export class BuscaAdvogadoComponent implements OnInit {

  constructor(
    private geolocService: GeolocationService
  ) { }

  geoloc = null;
  address: String;

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    let latitude, longitude;
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( 
        (position)  => (
          latitude = position.coords.latitude,
          longitude = position.coords.longitude,

          this.geolocService.getAddress(latitude, longitude).subscribe(geo => {
            this.geoloc = geo.valueOf();
            this.address = this.geoloc.results[0].formatted_address;
          })
        )
      );
    }
  }

}
