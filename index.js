import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conexion from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import productoRoutes from './routes/productoRoutes.js'
import importacionRoutes from './routes/importacionRoutes.js'
import categoriaRoutes from './routes/categoriaRoutes.js'
import pedidoRoutes from './routes/pedidoRoutes.js'

const app = express()
app.use(express.json())
dotenv.config()
conexion()

const whiteList = [process.env.FRONTEND_URL]

const corsOptions = {
    origin:function(origin, callback){
        if(!origin){
            return  callback(null , true)
        }else if(whiteList.includes(origin)){
            callback(null,true)
        }else{
            callback(new Error('Cors Error'))
        }
    }
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 4000

app.use('/api/usuarios', usuarioRoutes)
app.use('/api/productos', productoRoutes)
app.use('/api/importaciones', importacionRoutes)
app.use('/api/categorias', categoriaRoutes)
app.use('/api/pedidos', pedidoRoutes)

app.use('/imagenes', express.static('imagenes'))

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})