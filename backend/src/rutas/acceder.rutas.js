import {Router} from 'express';
import {AccederController} from "../controladores/acceder.controlador.js";

// URL: /api/acceder

const AccederRouter = Router();

AccederRouter.post('/registro', AccederController.registrarUsuario);
AccederRouter.post('/login', AccederController.autenticarUsuario);
export default AccederRouter;