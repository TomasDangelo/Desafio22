import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import ContenedorSQL from './contenedores/ContenedorSQL.js'
import ContenedorArchivo from './contenedores/ContenedorArchivo.js'
import config from './config.js'
import normalizr from 'normalizr';
import util from 'util';
import faker from 'faker';
faker.locale = 'es';


const normalize = normalizr.normalize;
const schema = normalizr.schema;

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)


const productosApi = new ContenedorSQL(config.mysql, 'productos')
const mensajesApi = new ContenedorArchivo(`${config.fileSystem.path}`)

//--------------------------------------------MENSAJES RANDOM 
const crearRandom = () => {
    return {
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        thumbnail: faker.image.avatar()
    }
}

const crearProductos = () => {
    let productos = []
    
    for (let i = 0; i < 5; i++) {
        productos.push(crearRandom())
    }
    return productos
} 

//-------------------------------------------- NORMALIZACIÓN DE MENSAJES

// Esquema de autor
const authorSchema = new schema.Entity('author')

// Definimos un esquema de mensaje
const messageSchema = new schema.Entity('message')

// Esquema de posts
const postSchema = new schema.Entity('posts', {
    author: authorSchema,
    messages: [messageSchema]
})
//Data normalizada y función para impirimirla
const normalizedData = normalize(mensajesApi.listarAll(), postSchema)

function print(objeto) {console.log(util.inspect(objeto, false, 12, true));}


//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    socket.emit('mensaje', mensajesApi.listarAll())
    socket.emit('producto', productosApi.listarAll())

    socket.on('new-message', data => {
        GuardarMensajes.guardar(data)
        io.sockets.emit('message', messages)
    })

    socket.on('new-producto', data => {
        productos.push(data)
        io.sockets.emit('producto', productos)
    })
    
});
async function listarMensajesNormalizados() {
    print(normalizedData);
}
//--------------------------------------------

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
app.get('/api/productos-test', (req, res) => {
    res.send(crearProductos())
})
//-------------------------------------------- Configuración server
const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))


export {normalizedData, print} 