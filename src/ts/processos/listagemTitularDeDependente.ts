import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import ImpressorDependente from "../impressores/impressorDependente";
import ImpressorDependentes from "../impressores/impressorDependentes";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemTitularDeDependente extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('Iniciando a listagem dos clientes dependentes...')
        let docDependente = this.entrada.receberTexto('Qual numero do documento do dependente?')
        
        let dependente = this.clientes.find(cli =>
            cli.Documentos.some(docs => docs.Numero == docDependente))
        
        if (!dependente){
            return console.log("cliente dependente não encontrado")
        }
        if (!dependente.Titular){
            return console.log("esse Cliente é do tipo Titular!!")
        }
        
         
        this.impressor = new ImpressaorCliente(dependente.Titular)
        console.log(this.impressor.imprimir())
        
        
                    
        
    }
    
}