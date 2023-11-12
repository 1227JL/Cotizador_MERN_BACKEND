import express from 'express'
import { 
    obtenerPedidos,
    realizarPedido
} from '../controller/pedidoController.js'

const router = express.Router()

router
    .route('/')
    .get(obtenerPedidos)
    .post(realizarPedido)

export default router