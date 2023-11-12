// Importar Mongoose
import mongoose from 'mongoose';

// Definir el esquema del modelo de Producto
const productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true
    },
    peso: {
        type: Number,
    },
    volumen: {
        type: Number,
    },
    precio_compra: {
        type: Number,
    },
    descripcion: {
        type: String,
    },
    imagen: String,
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }
}, { timestamps: true });

// Crear el modelo de Producto
const Producto = mongoose.model('Producto', productoSchema);

// Exportar el modelo
export default Producto;