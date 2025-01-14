import mongoose from 'mongoose';

// Definir el esquema de los datos
const dataSchema = new mongoose.Schema({
    nombre: { type: String, required: true },  // String
    email: { type: String, required: true, unique: true },  // String
    password: { type: String, required: true },  // String
});

// Crear el modelo de 'Usuario' basado en el esquema
export const Usuario = mongoose.model('usuarios', dataSchema);