import { Component } from '@angular/core';
import { GeolocationService } from './shared/services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (
  ) {}

  title = 'clientes-web';

}
