import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import ImpressorDocumentos from "./impressorDocumentos";
import ImpressorEndereco from "./impressorEndereco";

export default class ImpressorDependente implements Impressor {
    private dependente: Cliente
    private impressor!: Impressor

    constructor(dependente: Cliente) {
        this.dependente = dependente
    }

    imprimir(): string {
        let impressao = `****************************\n`
            + `| Dependente >\n`
            + `| Nome: ${this.dependente.Nome}\n`
            + `| Nome social: ${this.dependente.NomeSocial}\n`
            + `| Data de nascimento: ${this.dependente.DataNascimento.toLocaleDateString()}\n`
            + `| Data de cadastro: ${this.dependente.DataCadastro.toLocaleDateString()}`
        
        this.impressor = new ImpressorEndereco(this.dependente.Endereco)
        impressao = impressao + `\n${this.impressor.imprimir()}`

        this.impressor = new ImpressorDocumentos(this.dependente.Documentos)
        impressao = impressao + `\n${this.impressor.imprimir()}`        
        
        
            return impressao
    }

}