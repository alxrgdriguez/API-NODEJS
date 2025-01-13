import {Serie} from "../modelos/Serie.js";
export class SeriesController {

    static async obtenerSeries(req, res) {
            try {
                // Recuperar todas las series de la base de datos
                const datos = await Serie.find();
                console.log('Datos obtenidos:', datos);
                if (datos.length === 0) {
                    return res.status(404).json({ message: 'No se encontraron datos' });
                }

                // Enviar los datos de las series como respuesta en formato JSON
                res.status(200).json(datos);

            } catch (err) {
                console.error('Error al obtener los datos:', err);  // Mostrar el error en la consola
                res.status(500).json({ message: 'Error al obtener los datos', error: err.message });
            }
        }
}