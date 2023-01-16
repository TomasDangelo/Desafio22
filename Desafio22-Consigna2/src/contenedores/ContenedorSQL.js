import knex from 'knex'

class ContenedorSQL {
    constructor(cfg, tabla) {
        this.knex = knex(cfg)
        this.tabla = tabla
    }

    async listar(id) {
        await this.knex(this.tabla).where('id', id)
    }

    async listarAll() {
        await this.knex(this.tabla).select("*")
    }

    async guardar(elem) {
        await this.knex(this.tabla).insert(elem)
    }

    async actualizar(elem, id) {
        await this.knex.from(this.tabla).where('id', id).update(elem)
    }

    async borrar(id) {
        await this.knex.from(this.tabla).where('id', id).del()   
    }

    async borrarAll() {
        await this.knex.from(this.tabla).select("*").del()
    }

    async desconectar() {
        this.knex.destroy()
    }
}

export default ContenedorSQL