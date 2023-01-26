import mongoose from 'mongoose'

//! Conexión a Database
const connectMongo = mongoose.connect('mongodb://localhost/usuarios26' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//! Creación de Schemas

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String
})

const User = mongoose.model('User', userSchema)

const findUserByEmail = async (email) => {
    return await User.findOne({ email: email})}


const pushNewUser = async (email, password) => {
    return await User.create({email, password}
)}



export {findUserByEmail, pushNewUser}