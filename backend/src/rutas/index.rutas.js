import {Router} from 'express';
import SeriesRouter from './series.rutas.js';
import AccederRouter from "./acceder.rutas.js";

const MainRouter = Router();

MainRouter.use('/series', SeriesRouter);
MainRouter.use('/acceder', AccederRouter);
export default MainRouter;