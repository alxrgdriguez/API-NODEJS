import express from 'express';
import cors from 'cors';
import MainRouter from "./rutas/index.rutas.js";

export function setUpExpress() {
    const app = express();
    app.use(express.json());
    app.use('/api', MainRouter);
    app.use(cors());
    return app;
}
