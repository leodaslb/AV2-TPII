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

        if (buscarCliente.Titular != undefined) {
        let listaDoPai = buscarCliente.Titular.Dependentes
        let indexNoPai = listaDoPai.indexOf(buscarCliente)
        if (indexNoPai !== -1) {
            listaDoPai.splice(indexNoPai, 1)
            console.log("Vínculo com o titular removido!")
        }
    } 
    
  
    if (buscarCliente.Dependentes.length > 0) {
        buscarCliente.Dependentes.forEach(dep => {
            let indexDep = this.clientes.indexOf(dep)
            if (indexDep !== -1) {
                this.clientes.splice(indexDep, 1)
            }
        })
        console.log("Dependentes deste titular também foram removidos!")
    }

        let indexCliente = this.clientes.indexOf(buscarCliente)
        this.clientes.splice(indexCliente,1)
        console.log("Cliente deletado com sucesso!!")
        
    }


}