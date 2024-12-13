import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/productos.routes.js';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

// Configuración para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta para archivos estáticos
const staticPath = path.resolve(__dirname, '../../../front/img');

const app = express();

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos de la carpeta 'front/img'
app.use('/img', express.static(staticPath));

// Logger de solicitudes
app.use(morgan('dev'));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use(userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log('Server on port', PORT);
});
