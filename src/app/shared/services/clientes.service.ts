import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escritorio } from '../models/escritorio.model';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {
    constructor(
        private httpClient: HttpClient
    ) { }

    public obterEscritorios(): Observable<Escritorio[]> {
        return this.httpClient.get<Escritorio[]>(environment.autenticadorApi + 'clientes/offices');
    }
}
