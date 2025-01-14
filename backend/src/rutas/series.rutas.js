import {Router} from 'express';
import {SeriesController} from "../controladores/series.controlador.js";

const SeriesRouter = Router();

// URL: /api/series
SeriesRouter.get('/', SeriesController.obtenerSeries);
SeriesRouter.post('/', SeriesController.agregarSerie);
SeriesRouter.put('/:id', SeriesController.sumarPuntuacion);
SeriesRouter.get('/toprated', SeriesController.obtener10SerieMasPuntuadas);
SeriesRouter.get('/genero/:genero', SeriesController.buscarPorGenero);
SeriesRouter.get('/:id', SeriesController.obtenerSeriePorId);
SeriesRouter.delete('/:id', SeriesController.eliminarSerie);
export default SeriesRouter;