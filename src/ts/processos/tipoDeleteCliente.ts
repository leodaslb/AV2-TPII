import Processo from "../abstracoes/processo";

import MenuTipoDeleteCliente from "../menus/menuTipoDeleteCliente";
import DeleteCliente from "./deleteCliente";

export default class TipoDeleteCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoDeleteCliente()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        
        switch (this.opcao) {
            case 1:
                this.processo = new DeleteCliente()
                this.processo.processar()
                break
            case 2:
                
               // this.processo = new CadastroClienteDependente()
                
                
                this.processo.processar()
                break
            default:

                console.log('Opção não entendida :(')
        }
    }
}