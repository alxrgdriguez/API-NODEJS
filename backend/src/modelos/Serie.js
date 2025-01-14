import mongoose from 'mongoose';

// Definir el esquema de los datos
const dataSchema = new mongoose.Schema({
    titulo: { type: String, required: true },  // String
    descripcion: { type: String, required: true },  // String
    miPuntuacion: { type: Number, required: true },  // Double (en MongoDB es Number)
    esMiniserie: { type: Boolean, required: true },  // Boolean
    nTemporadas: { type: Number, required: true },  // Int32 (en MongoDB es Number)
    anio: { type: Number, required: true },  // Int32 (en MongoDB es Number)
    genero: { type: String, required: true },  // String
    puntuacionTotal: { type: Number, required: true },  // Double (en MongoDB es Number)
    imagen: { type: String, required: true }  // String
});

// Crear el modelo de 'Serie' basado en el esquema
export const Serie = mongoose.model('series', dataSchema);
