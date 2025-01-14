import {Usuario} from '../modelos/Usuario.js';
import {hashSync, compareSync} from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        const saltRounds = parseInt(process.env.SALTROUNDS);
        const passwordHash = hashSync(password,saltRounds);

        // Crear el usuario
        const usuario = new Usuario({
            nombre,
            email,
            password: passwordHash
        });

        // Guardar el usuario en la base de datos
        try {
            const usuarioGuardado = await usuario.save();

            // Crear un token de acceso
            const JWT_SECRET = process.env.JWT_SECRET;
            const token = jwt.sign({id: usuarioGuardado._id}, JWT_SECRET);

            // Enviar el token de acceso como respuesta
            res.status(201).json({token, usuario: usuarioGuardado});

        }catch (error) {
            return res.status(500).json({mensaje: 'Error al guardar usuario'});
        }
    }

    static async autenticarUsuario(req, res) {
        const {email, password} = req.body;
        let usuario;
        // Comprobar que el usuario existe
        try {
            usuario = await Usuario.findOne({email});
            if (!usuario) {
                return res.status(404).json({mensaje: 'Usuario no encontrado'});
            }
        }catch (error) {
            return res.status(500).json({mensaje: 'Error al buscar usuario'});
        }

        // Comporbar la contraseña y compararla con la contraseña almacenada
        const compararContrasena= compareSync(password, usuario.password);

        if (!compararContrasena) {
            return res.status(401).json({mensaje: 'Contraseña incorrecta'});
        }

        // Crear un token de acceso
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign({id: usuario._id}, JWT_SECRET);

        // Enviar el token de acceso como respuesta
        res.status(200).json({token});

    }
}