import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class DeleteCliente extends Processo{
    private clientes: Cliente[]

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        
        console.log("Iniciando processo de Delete de cliente...")
        let docCliente = this.entrada.receberTexto('Qual numero do documento do cliente?')
        let buscarCliente = this.clientes.find(cli => cli.Documentos.some(docs => docs.Numero == docCliente))
        if(!buscarCliente){
            return console.log("Cliente não encontrado")
        }

        let titular = buscarCliente.Titular.Dependentes
        if(titular.length > 0){
            let remoOmaior = titular.indexOf(buscarCliente)
            titular.splice(remoOmaior, 1)
            console.log("dependente removido do titular!")
        }



        let indexCliente = this.clientes.indexOf(buscarCliente)
        this.clientes.splice(indexCliente,1)
        console.log("Cliente deletado com sucesso!!")
        
    }


}