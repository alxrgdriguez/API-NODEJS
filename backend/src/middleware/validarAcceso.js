import jwt from "jsonwebtoken";

export const validarAcceso = (req, res, next) => {
    // Obtener el token del encabezado 'Authorization'
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ mensaje: 'Acceso denegado, token no proporcionado' });
    }

    try {
        // Verificar el token con la clave secreta
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);  // Agregar la información del usuario decodificada al objeto req
        next();  // Continuar con el flujo de la solicitud
    } catch (err) {
        res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
}