import {connectDB} from './conexion/database.js';
import {setUpExpress} from './app.js';

process.loadEnvFile('.env')
await connectDB();

const app = setUpExpress();

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
