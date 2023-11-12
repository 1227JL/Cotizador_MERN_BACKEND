import express from 'express'
import { 
    obtenerProductos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
} from '../controller/productoController.js';
import checkAuthAdmin from '../middleware/checkAuthAdmin.js';

const router = express.Router();

router
    .route('/')
    .get(obtenerProductos)
    .post(checkAuthAdmin, agregarProducto)

router
    .route('/:id')
    .put(checkAuthAdmin, actualizarProducto)
    .delete(checkAuthAdmin, eliminarProducto)
    
export default router