import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteDependente extends Processo {


    processar(): void {
        let armazem = Armazem.InstanciaUnica
        console.log('Iniciando o cadastro de um novo cliente Dependente...')
        let docTitular = this.entrada.receberTexto('Qual numero do documento do titular?')
        let titular = armazem.Clientes.find(cli => cli.Documentos.some(docs => docs.Numero == docTitular))
        if (!titular){
            return console.log("titular não encontrado")
        }
        if (titular.Titular){
            return console.log("esse Cliente é do tipo Dependente!!")
        }
        

        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        let cliente = new Cliente(nome, nomeSocial, dataNascimento)
        cliente.Titular = titular
        

        //endereço
        cliente.Endereco= titular.Endereco.clonar() as Endereco

        //documento
        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()
        

        
        armazem.Clientes.push(cliente)
        titular.Dependentes.push(cliente)

        console.log('Finalizando o cadastro do client dependente...')
    }
}