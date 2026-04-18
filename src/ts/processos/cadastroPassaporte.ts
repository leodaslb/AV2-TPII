import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroPassaporte extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        let numero = this.entrada.receberTexto('Qual o número do documento?')
        //validando doc
        let cliente = armazem.Clientes.find(cli => cli.Documentos.some(docs => docs.Numero == numero))
        let docExistente = this.cliente.Documentos.some((docs => docs.Numero == numero))
        if (cliente || docExistente){
            return console.log("Documento já cadastrado, não foi possivel continuar com processo")}
        

        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
        let passaporte = new Documento(numero, TipoDocumento.Passaporte, dataExpedicao)
        this.cliente.Documentos.push(passaporte)
        console.log("Documento cadastrado!")
    }
}