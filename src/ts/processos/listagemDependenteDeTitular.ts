import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import ImpressorDependente from "../impressores/impressorDependente";
import ImpressorDependentes from "../impressores/impressorDependentes";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemDependentesDeTitular extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('Iniciando a listagem dos clientes dependentes...')
        let docTitular = this.entrada.receberTexto('Qual numero do documento do titular?')
        
        let titular = this.clientes.find(cli =>
            cli.Documentos.some(docs => docs.Numero == docTitular))
        
        if (!titular){
            return console.log("titular não encontrado")
        }
        if (titular.Titular){
            return console.log("esse Cliente é do tipo Dependente!!")
        }
        
         
        this.impressor = new ImpressorDependentes(titular.Dependentes)
        console.log(this.impressor.imprimir())
        
        
                    
        
    }
    
}