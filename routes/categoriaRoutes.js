import express from 'express'
import { 
    obtenerCategorias,
    registrarCategoria 
} from '../controller/categoriaController.js'

const router = express.Router()

router
    .route('/')
    .get(obtenerCategorias)
    .post(registrarCategoria)


export default router