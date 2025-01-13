import {Router} from 'express';
import {SeriesController} from "../controladores/series.controlador.js";

const SeriesRouter = Router();

// URL: /api/series
SeriesRouter.get('/', SeriesController.obtenerSeries);
SeriesRouter.post('/', SeriesController.obtenerSeries);
SeriesRouter.put('/:id', SeriesController.obtenerSeries);
SeriesRouter.delete('/:id', SeriesController.obtenerSeries);
export default SeriesRouter;