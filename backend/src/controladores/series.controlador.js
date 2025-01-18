import {Serie} from "../modelos/Serie.js";
import {v4 as uuidv4} from 'uuid';
import {s3} from "../conexion/s3.js";
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

    static async agregarSerie(req, res) {
        try {
            // Obtener los datos de la petición
            const datos = req.body;
            console.log('Datos recibidos:', datos);

            const imagen = req.file;
            console.log('Imagen recibida:', imagen);

            const extension = imagen.originalname.split('.').pop();
            console.log('Extensión de la imagen:', extension);

            const nombreImagen = uuidv4() + '.' + extension;

            const subidaParametros = {

                Bucket: process.env.S3_BUCKET_NAME, // Nombre del bucket de S3
                Key: nombreImagen, // El nombre con el que se guardará la imagen en S3
                Body: imagen.buffer, // El contenido de la imagen en formato buffer
                ContentType: imagen.mimetype, // El tipo de contenido de la imagen
            };

            // Upload the file to S3
            s3.upload(subidaParametros, (err, data) => {
                if (err) {
                    console.log('Error al subir la imagen:', err);
                } else {
                    console.log('Archivo subido:', data.Location);
                }

            });

            // Crear una nueva serie en la base de datos
            const nuevaSerie = new Serie(datos);
            await nuevaSerie.save();

            // Enviar un mensaje de respuesta con el resultado de la operación
            res.status(200).json({ message: 'Series creada correctamente' });

        } catch (err) {
            console.error('Error al crear la serie:', err);  // Mostrar el error en la consola
            res.status(500).json({ message: 'Error al crear la serie', error: err.message });
        }
    }

    static async eliminarSerie(req, res) {
        try {
            // Obtener el id de la serie a eliminar
            const id = req.params.id;
            console.log('ID de la serie a eliminar:', id);

            // Eliminar la serie con el id especificado
            const serieEliminada = await Serie.findByIdAndDelete(id);
            console.log('Series eliminada:', serieEliminada);

            if(serieEliminada === null) {
                return res.status(404).json({ message: 'No se encontró la serie' });
            }

            // Enviar un mensaje de respuesta con el resultado de la operación
            res.status(200).json({ message: 'Series eliminada correctamente' });

        } catch (err) {
            console.error('Error al eliminar la serie:', err);  // Mostrar el error en la consola
            res.status(500).json({ message: 'Error al eliminar la serie', error: err.message });
        }
    }

    static async obtenerSeriePorId(req, res) {
        try {
            // Obtener el id de la serie a obtener
            const id = req.params.id;
            console.log('ID de la serie a obtener:', id);

            // Obtener la serie con el id especificado
            const serieObtenida = await Serie.findById(id);

            if(serieObtenida === null) {
                return res.status(404).json({ message: 'No se encontró la serie' });
            }

            console.log('Series obtenida:', serieObtenida);

            // Enviar los datos de la serie como respuesta en formato JSON
            res.status(200).json(serieObtenida);

        } catch (err) {
            console.error('Error al obtener la serie:', err);  // Mostrar el error en la consola
            res.status(500).json({ message: 'Error al obtener la serie', error: err.message });
        }
    }

    static async buscarPorGenero(req, res) {
        try {
            // Obtener el género de la serie a buscar
            const genero = req.params.genero;
            console.log('Género de la serie a buscar:', genero);

            // Buscar todas las series con el género especificado
            const seriesBuscadas = await Serie.find({ genero: genero });

            if(seriesBuscadas.length === 0) {
                return res.status(404).json({ message: 'No se encontraron series' });
            }

            console.log('Series buscadas:', seriesBuscadas);

            // Enviar los datos de las series como respuesta en formato JSON
            res.status(200).json(seriesBuscadas);

        } catch (err) {
            console.error('Error al buscar series por género:', err);  // Mostrar el error en la consola
            res.status(500).json({ message: 'Error al buscar series por género', error: err.message });
        }
    }

    static async obtener10SerieMasPuntuadas(req, res) {
        try {
            // Buscar las 10 series más puntuadas
            const seriesMasPuntuadas = await Serie.find().sort({ puntuacionTotal: -1 }).limit(10);
            console.log('Series más puntuadas:', seriesMasPuntuadas);

            // Enviar los datos de las series como respuesta en formato JSON
            res.status(200).json(seriesMasPuntuadas);

        } catch (err) {
            console.error('Error al obtener las 10 series más puntuadas:', err);  // Mostrar el error en la consola
            res.status(500).json({ message: 'Error al obtener las 10 series más puntuadas', error: err.message });
        }
    }

    static async sumarPuntuacion(req, res) {
        try {
            // Obtener el id de la serie a sumar la puntuación
            const id = req.params.id;
            console.log('ID de la serie a sumar la puntuación:', id);

            // Obtener la serie con el id especificado
            const serie = await Serie.findById(id);

            if(serie === null) {
                return res.status(404).json({ message: 'No se encontró la serie' });
            }

            console.log('Series obtenida:', serie);

            // Incrementar la puntuación de la serie
            // TODO: Revisar el funcionamiento de esta parte código
            serie.puntuacionTotal += req.puntuacionTotal;
            await serie.save();

            // Enviar un mensaje de respuesta con el resultado de la operación
            res.status(200).json({ message: 'Puntuación sumada correctamente' });

        } catch (err) {
            console.error('Error al sumar la puntuación:', err);  // Mostrar el error en la consola
            res.status(500).json({ message: 'Error al sumar la puntuación', error: err.message });
        }

    }
}