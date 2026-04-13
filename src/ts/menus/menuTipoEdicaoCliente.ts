import Menu from "../interfaces/menu";

export default class MenuTipoEdicaoCliente implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Quais informações deseja editar? `)
        console.log(`----------------------`)
        console.log(`| 1 - Nome/dataNascimento`)
        //console.log(`| 2 - Endereço`)
        console.log(``)
        console.log(`----------------------`)
    }
}