import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Telefone from "../modelos/telefone";

export default class CadastroTelefone extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.log(`--- Cadastro de Telefone para ---`)
        
        let ddd = this.entrada.receberTexto('Qual o DDD? ')
        let numero = this.entrada.receberTexto('Qual o número do telefone?')


        let telefoneExistente = this.cliente.Telefones.some(tel => 
            tel.Ddd === ddd && tel.Numero === numero
        )

        if (telefoneExistente) {
            return console.log("Este telefone já está cadastrado para este cliente.")
        }


        let novoTelefone = new Telefone(ddd, numero)
        this.cliente.Telefones.push(novoTelefone)

        console.log("Telefone cadastrado com sucesso!")
    }
}