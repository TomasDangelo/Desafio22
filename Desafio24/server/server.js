import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session'
import MongoStore from 'connect-mongo'
//----------------------------------------------------------------/
//---------------Configuraciones generales de server
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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
// if (username !== "Pepe" || password !== "pepePass"){res.json({"messages": ["Error validando tu usuario"]})}

req.session.user = username
req.session.admin = true;
res.json({"messages": [`Bienvenido ${username}`]})
})

app.get('/logout' , (req, res) => {
    req.session.destroy(err => {
     err? res.json({messages: ['Error en el logout']}) : res.send('Hasta luego!!')
    })
})

//---------------CFG DEL SERVER
const PORT = 8080;
app.listen(PORT, () => {console.log("Server corriendo correctamente!")})

