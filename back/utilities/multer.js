import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta a la carpeta 'img' dentro de 'front'
const uploadPath = path.resolve(__dirname, '../../../PROYECTO-TIENDA/front/img');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath); // Usa la ruta absoluta
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
    }
});

export default multer({ storage: storage });

