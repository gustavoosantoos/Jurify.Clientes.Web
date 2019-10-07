import { Component } from '@angular/core';
import { GeolocationService } from './shared/services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (
    public geolocService: GeolocationService
  ) {}

  title = 'clientes-web';
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
