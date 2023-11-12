import mongoose from "mongoose";

const pedidoSchema = mongoose.Schema({
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
    fechaCompra: {
        type: Date,
        default: Date.now,
    },
    descuentoAplicado: {
        type: Number,
    },
    precioTotal: {
        type: Number,
        required: true,
        },
    },
    { timestamps: true }
);
  
const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido