import express from 'express';
import cors from 'cors';
import MainRouter from './rutas/index.rutas.js';

export function setUpExpress() {
    const app = express();

    app.use(express.json());
    app.use('/api', MainRouter);

    // Aplicar las opciones de CORS
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    return app;
}
