import express from 'express';
import session from 'express-session'
import MongoStore from 'connect-mongo'
//------------------------Configuraciones generales de server----------------------------------------/
const app = express();

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}

//---------------Endpoints: login y logout

app.use(session({  //Creamos la session con Mongo de forma local
    store: MongoStore.create({mongoUrl: 'mongodb://localhost/sesiones' , mongoOptions: advancedOptions}),
    secret: 'secretData',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000}
}))

app.get('/login' , (req, res) => {
const {username, password} = req.query;
if (username !== "Pepe" || password !== "pepePass"){res.json({"messages": ["Error validando tu usuario"]})}

req.session.user = username
req.session.admin = true;
res.json({"messages": [`Bienvenido ${username}`]})
})

app.get('/logout' , (req, res) => {
    req.session.destroy(err => {
     err? res.json({messages: ['Error en el logout']}) : res.json({messages: ['Hasta luego!!']})
    })
})

//---------------CFG DEL SERVER
const PORT = 8080;
app.listen(PORT, () => {console.log("Server corriendo correctamente!")})

