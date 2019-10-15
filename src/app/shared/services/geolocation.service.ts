import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private http: HttpClient
  ) { }

  public  getAddress(lat, long): Observable<Object> {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyCL-6vOejsS5QLc6_XI8qlvjnr6f5m6-d8&language=pt-BR';

    const resp = this.http.get(url);
    return resp;
  }
}
