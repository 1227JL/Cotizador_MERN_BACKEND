import express from 'express'
import { 
    obtenerPedidosUsuario,
    obtenerPedidos,
    realizarPedido,
    actualizarPedido
} from '../controller/pedidoController.js'
import checkAuth from '../middleware/checkAuth.js'
import checkAuthAdmin from '../middleware/checkAuthAdmin.js'

const router = express.Router()

router
    .route('/')
    .get(checkAuth, obtenerPedidosUsuario)
    .post(checkAuth, realizarPedido)

router
    .route('/:id')
    .put(actualizarPedido)

router
    .route('/admin')
    .get(checkAuthAdmin, obtenerPedidos)

export default router