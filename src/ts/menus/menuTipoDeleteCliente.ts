import Menu from "../interfaces/menu";

export default class MenuTipoDeleteCliente implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Quais informações deseja deletar? `)
        console.log(`----------------------`)
        console.log(`| 1 - Deletar cliente`)
        //console.log(`| 2 - Endereço`)
        console.log(``)
        console.log(`----------------------`)
    }
}