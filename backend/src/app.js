import express from 'express';
import cors from 'cors';
import MainRouter from './rutas/index.rutas.js';

export function setUpExpress() {
    const app = express();

    // Configurar CORS para permitir solicitudes solo desde http://localhost:4321
    const corsOptions = {
        origin: 'http://localhost:4321',  // Permitir solicitudes solo desde el frontend de Astro
        methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos HTTP permitidos
        allowedHeaders: ['Content-Type', 'Authorization'],  // Encabezados permitidos
    };

    app.use(express.json());
    app.use('/api', MainRouter);

    // Aplicar las opciones de CORS
    app.use(cors(corsOptions));

    return app;
}
