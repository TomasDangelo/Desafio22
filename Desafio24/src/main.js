import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { Server as HttpServer } from 'http'
//----------------------------------------------------------------//


//---------------Configuraciones generales de server
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const httpServer = new HttpServer(app)

//---------------Endpoints: login y logout

app.use(session({  //Creamos la session con Mongo de forma local
    store: MongoStore.create({mongoUrl: 'mongodb://localhost/sesiones'}),
    secret: 'secretData',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 10000}
}))

app.get('/login' , (req, res) => {
    const {username, password} = req.query;
if (username !== "Pepe" || password !== "pepePass"){return res.status(401).send('Error validando tu usuario')}

req.session.user = username
req.session.admin = true;
res.send(`Bienvenido ${username}!`)
})

app.get('/logout' , (req, res) => {
    req.session.destroy(err => {
     err? res.status(404).send('Error en el logout') : res.send('Hasta luego!!')
    })
})


//---------------CFG DEL SERVER
const PORT = 8080;
const serverConectado = httpServer.listen(PORT, () => {
    console.log("Server corriendo correctamente!")
})

serverConectado.on('error', error => console.log(`Error en el servidor ${error}`))