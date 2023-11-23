import mongoose from "mongoose";

const pedidoSchema = mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
        },
        productosComprados: [
            {
                producto: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Producto',
                    required: true,
                },
                cantidad_pedido: {
                    type: Number,
                    required: true,
                },
            },
        ],
        descuentoAplicado: {
            type: Number,
        },
        precioTotal: {
            type: Number,
            required: true,
        },
        direccion: {
            type: String,
            required: true,
        },
        departamento: {
            type: String,
            required: true,
        },
        estado:{
            type:String,
            enum: ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'],
            required: true,
            default: 'Pendiente'
        },
        ciudad: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);
  
const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido