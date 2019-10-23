import { Especialidade } from './especialidade.model';
export class Escritorio {
    public codigo: string;
    public razaoSocial: string;
    public latitude: number;
    public longitude: number;
    public endereco: string;
    public especialidades: Especialidade[];
}
