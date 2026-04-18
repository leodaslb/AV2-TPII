import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastroTelefone from "./cadastrarTelefonesCliente";

export default class EditarCliente extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica

        console.log('Iniciando a edição do cliente...')
        let docCliente = this.entrada.receberTexto('Qual numero do documento do cliente?')
        let buscarCliente = armazem.Clientes.find(cli => cli.Documentos.some(docs => docs.Numero == docCliente))
        
        if(!buscarCliente){
            return console.log("Cliente não encontrado")
        }

        let novoNome = this.entrada.receberTexto(`Qual o novo nome do cliente? (Atual: ${buscarCliente.Nome})`)
        if(novoNome.trim() !== ""){
            buscarCliente.Nome = novoNome
        }

        let novoNomeSocial = this.entrada.receberTexto(`Qual o novo nome social do cliente? (Atual: ${buscarCliente.NomeSocial})`)
        if(novoNomeSocial.trim() !== ""){
            buscarCliente.NomeSocial = novoNomeSocial
        }

        console.log(`Data de nascimento atual: ${buscarCliente.DataNascimento.toLocaleDateString()}`)
        let editData = this.entrada.receberTexto('Deseja alterar a data de nascimento? [S/N]').toUpperCase()
        if (editData === 'S') {
            buscarCliente.DataNascimento = this.entrada.receberData('Qual a nova data de nascimento?')
        }
        
        let editEnd = this.entrada.receberTexto('Deseja editar o endereço? [S/N]').toUpperCase()
        if (editEnd === 'S'){
            this.processo = new CadastroEnderecoTitular(buscarCliente)
            this.processo.processar()
            if(buscarCliente.Dependentes && buscarCliente.Dependentes.length > 0){
                buscarCliente.Dependentes.forEach(dep => dep.Endereco = buscarCliente.Endereco.clonar() as Endereco)
            }
        }

        let editTel = this.entrada.receberTexto('Deseja atualizar os telefones? [S/N]').toUpperCase()
        if(editTel === 'S'){
            buscarCliente.setTelefones = []
            this.processo = new CadastroTelefone(buscarCliente)
            this.processo.processar()
        }

        console.log("Por questões de integridade não é possivel editar um documento")
        let editDocs = this.entrada.receberTexto('Deseja adicionar um novo documento? [S/N]').toUpperCase()
        if(editDocs === 'S'){
            this.processo = new CadastrarDocumentosCliente(buscarCliente)
            this.processo.processar()
        }

        console.log('Finalizando a edição do cliente...')
    }
}