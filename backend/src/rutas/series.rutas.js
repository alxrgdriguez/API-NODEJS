import {Router} from 'express';
import {SeriesController} from "../controladores/series.controlador.js";
import multer from "multer";
import {v4 as uuidv4} from "uuid";
import {validarAcceso} from "../middleware/validarAcceso.js";

const SeriesRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const ruta = process.cwd();
        cb(null, ruta + '/public');
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').pop();
        const nombreImagen = uuidv4() + '.' + extension;
        cb(null, nombreImagen);
    }
});

const upload = multer({storage: storage});

SeriesRouter.use(validarAcceso);

// URL: /api/series
SeriesRouter.get('/', SeriesController.obtenerSeries);
SeriesRouter.post('/', upload.single("imagen"),SeriesController.agregarSerie);
SeriesRouter.put('/:id', SeriesController.sumarPuntuacion);
SeriesRouter.get('/toprated', SeriesController.obtener10SerieMasPuntuadas);
SeriesRouter.get('/genero/:genero', SeriesController.buscarPorGenero);
SeriesRouter.get('/:id', SeriesController.obtenerSeriePorId);
SeriesRouter.delete('/:id', SeriesController.eliminarSerie);
export default SeriesRouter;