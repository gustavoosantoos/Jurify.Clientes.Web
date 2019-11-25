import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escritorio } from '../models/escritorio.model';
import { NovaMensagem } from '../models/nova-mensagem.model';
import { Especialidade } from '../models/especialidade.model';

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

    public enviarMensagemEscritorio(escritorio: Escritorio, mensagem: NovaMensagem): Observable<any> {
        const url = environment.advogadosApi + 'escritorios/mensagens/' + escritorio.codigo;
        return this.httpClient.post<any>(url, mensagem);
    }

    public enviarMensagemPublica(mensagem: NovaMensagem): Observable<any> {
      const url = environment.advogadosApi + 'mensagenspublicas';
      return this.httpClient.post<any>(url, mensagem);
    }

    public obterEspecialidades(): Observable<Especialidade[]> {
        return this.httpClient.get<Especialidade[]>(environment.autenticadorApi + 'advogados/specialties/listar-especialidades');
    }
}
