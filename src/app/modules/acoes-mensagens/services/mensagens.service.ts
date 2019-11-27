import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {
  private baseUrl = environment.advogadosApi + 'mensagenspublicas';

  constructor(
    private http: HttpClient
  ) { }

  public aceitarAdvogado(codigo: string): Observable<string> {
    const url = `${this.baseUrl}/${codigo}/aceitar`;
    return this.http.post<string>(url, { });
  }

  public reativarMensagem(codigo: string): Observable<string> {
    const url = `${this.baseUrl}/${codigo}/reativar`;
    return this.http.post<string>(url, { });
  }

  public removerMensagem(codigo: string): Observable<string> {
    const url = `${this.baseUrl}/${codigo}`;
    return this.http.delete<string>(url, { });
  }
}
