import { Router } from "express";
import { 
    getProductos, 
    getProducto, 
    createProducto, 
    deleteProducto, 
    updateProducto 
} from "../controllers/productos.controllers.js";
import upload from '../../utilities/multer.js';

const router = Router();

router.get('/productos', getProductos);

router.get('/productos/:id', getProducto);

router.post('/productos', upload.single('imagen'), createProducto);

router.delete('/productos/:id', deleteProducto);

// Agregar middleware `upload.single` a la ruta PUT
router.put('/productos/:id', upload.single('imagen'), updateProducto);

export default router;
