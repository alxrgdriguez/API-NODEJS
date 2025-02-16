import mongoose from 'mongoose';

// Configuración de la base de datos (cadena de conexión)
const dbURI = 'mongodb://root:toor@mongodb:27017';

// Conectar a MongoDB con la configuración adecuada
export async function connectDB() {
    try {
        await mongoose.connect(dbURI, {
            dbName:'series_api'});
            console.log('Conexión establecida con éxito a la base de datos');
    }catch (error) {
        console.log(error);
        process.exit(1);
    }
}



