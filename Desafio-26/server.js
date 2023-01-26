import express from 'express'
import jwt from './jwt.js'
import {findUserByEmail, pushNewUser} from './schemas/usersSchema.js'
import path from 'path'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
 
app.get('/', (req, res) => {
    res.sendFile(path.dirname('/public/index.html'))
})

//!Rutas de registro
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'register.html'));
});


app.post('/register', async (req, res) => {
    const {email, password} = req.body;  
    try {
        const existingUser = await findUserByEmail(email)// Buscar usuario en base de datos
        if (existingUser) {
          return res.status(402).json({msg: "Error: usuario ya registrado con ese mail"});
        }
        await pushNewUser(email, password);// Si no hay error, guardamos el usuario nuevo en Mongo
        const access_token = jwt.generateAuthToken(email); // Generamos el token de acceso
        res.json({msg: `Usuario creado con email ${email}. Token de acceso ${access_token}`});
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Error registrandote'});
    }
});

//!Rutas de inicio de sesión

app.get('/login', (req, res) => {
    res.sendFile(path.dirname('public/login.html'))

})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;  

    try {
        const existingUser = await findUserByEmail(email); // Comprobamos si existe el usuario 
        if (!existingUser) {return res.status(402).json({msg: "Error: usuario no registrado"});}
        // Chequeo de credenciales
        if(existingUser.email !== email || existingUser.password !== password){
            return res.status(401).json({error: 'Credenciales inválidas'});}
  
        const accessToken = jwt.generateAuthToken(email); 

        res.json({msg: `Bienvenido, ${email}. Tu token de acceso es: ${accessToken}`});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Error interno del servidor'});
    }
});

app.get('/login-error'), (req, res) => {
    res.status(402).json({error : "Error en el login. Por favor intente más tarde"})
}
app.get('/register-error'), (req, res) => {
    res.status(402).json({error : "Error al registrar. Por favor intente más tarde"})
}

//Ruta de la API

app.get('/api/datos', jwt.auth, async (req,res) => {
    const {email} = req.params
    const existingUser = await findUserByEmail(email)
    !existingUser && res.status(404).json({error : "Error. Usuario no encontrado"})

    res.json({datos: existingUser})
})

const server = app.listen(8080, () => {
    console.log("Servidor corriendo correctamente!")
})
server.on('error', err => console.log(err))
