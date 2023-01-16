import { promises as fs } from 'fs'
import config from '../config.js'

class ContenedorArchivo {

    constructor() {
        this.ruta = `${config.fileSystem.path}`;
    }

    async listar(id) {
        const leer = this.listarAll()
        const encontrar = leer.filter((prod) => prod.id === id)
        listar? encontrar : false
    }

    async listarAll() {
       try {
           const leer = await fs.readFile(this.ruta , 'utf8')
           return JSON.parse(leer)
       } catch (error) {
        console.error(error)
       }
    }

    async guardar(obj) {
        const leer = this.listarAll()
        let id;
        if (leer.length === 0) {id = 1} else {id = leer.length + 1}
        obj.id = id
        let prods = [... leer , obj]
        await fs.writeFile(this.ruta,  JSON.stringify(prods, null, 2))
        return obj
    }

    async actualizar(elem, id) {
        let prods = JSON.parse(this.listarAll())
        const existe = prods.find(p => p.id === id)

    }

    async borrar(id) {
        const leer = this.listarAll()
        const filtrar = leer.filter((prod)=> prod.id !== id)
        JSON.stringify(fs.writeFile(this.ruta, filtrar, 'utf8'), null, 2);
    }

    async borrarAll() {
        try {
            let prods = []
            await JSON.stringify(fs.writeFile(this.ruta, prods, 'utf8'), null, 2);
        } catch (error) {
            console.error(error)
        }
    }
}


export default ContenedorArchivo