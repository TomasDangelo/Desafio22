import jwt from 'jsonwebtoken'
const PRIVATE_KEY = 'privateKeyTomasDangelo'

const generateAuthToken = (nombre) => {
    const token = jwt.sign({nombre: nombre}, PRIVATE_KEY, {expiresIn: '60s'})
    return token
}

const auth = (req, res, next) => {
    const authenticationHeader = req.headers["authorization"] || req.headers["Authorization"] || ''
    console.log("Header de auth", authenticationHeader)

    !authenticationHeader && res.status(401).json({
        error: 'Se requiere token de autenticación para poder acceder a este recurso'
    })
    const token = authenticationHeader.split(' ')[1]

    !token&& res.status(401).json({
        error: 'Se requiere token de autenticación para poder acceder a este recurso',
    })

    try {
        req.user = jwt.verify(token, PRIVATE_KEY)
    } catch (err) {
        return res.status(403).json({
            error: 'Invalid token',
            detail: 'Nivel de acceso insuficiente para el recurso solicitado'
          })
    }
    next();
}

export default {generateAuthToken, auth}