import {Usuario} from '../modelos/Usuario.js';
import {compareSync, hashSync} from 'bcrypt';

export class AccederController {

    static async registrarUsuario(req, res) {
        const {nombre, email, password} = req.body;

        // Validar que el usuario no exista
      try {
          const usuarioExistente = await Usuario.findOne({email});
          if (usuarioExistente) {
              return res.status(400).json({mensaje: 'El usuario ya existe'});
          }
      }catch (error) {
          return res.status(500).json({mensaje: 'Error al buscar usuario'});
      }

      // Hashear la contraseña
        const passwordHash = hashSync(password, 10);

        // Crear el usuario
        const usuario = new Usuario({
            nombre,
            email,
            password: passwordHash
        });
    }

    static async autenticarUsuario(req, res) {
    }
}