import express from 'express'
import { 
    registrarImportacion,
    obtenerImportaciones 
} from '../controller/importacionController.js'

const router = express.Router()

router
    .route('/')
    .get(obtenerImportaciones)
    .post(registrarImportacion)

export default router