import {Router} from 'express';
import {SeriesController} from "../controladores/series.controlador.js";
import {verificarToken} from "../middleware/verificarToken.js";
import multer from "multer";

const SeriesRouter = Router();

const upload = multer({storage: multer.memoryStorage()});

// URL: /api/series
SeriesRouter.get('/', verificarToken, SeriesController.obtenerSeries);
SeriesRouter.post('/', verificarToken, upload.single("imagen"),SeriesController.agregarSerie);
SeriesRouter.put('/:id', verificarToken, SeriesController.sumarPuntuacion);
SeriesRouter.get('/toprated', verificarToken, SeriesController.obtener10SerieMasPuntuadas);
SeriesRouter.get('/genero/:genero', verificarToken, SeriesController.buscarPorGenero);
SeriesRouter.get('/:id', verificarToken, SeriesController.obtenerSeriePorId);
SeriesRouter.delete('/:id', verificarToken, SeriesController.eliminarSerie);
export default SeriesRouter;