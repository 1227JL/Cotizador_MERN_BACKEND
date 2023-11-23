import Pedido from "../models/Pedido.js"

const obtenerPedidosUsuario = async (req, res) => {
    const pedidos = await Pedido.find({usuario: req.usuario._id}).populate('productosComprados.producto')
    res.json(pedidos)
}

const obtenerPedidos = async (req, res) => {
    const pedidos = await Pedido.find().populate('productosComprados.producto').populate({path: 'usuario', select:'-__v -rol -token -confirmado -password -image -updatedAt -createdAt'})
    res.json(pedidos)
}

const realizarPedido = async (req, res) => {
    try {
        const pedidoAlmacenado = await Pedido(req.body)
        await pedidoAlmacenado.save()
        
        const pedidoPopulado = await Pedido.findById(pedidoAlmacenado._id).populate('productosComprados.producto')
        res.json(pedidoPopulado)
    } catch (error) {
        console.log(error)
    }
}

const actualizarPedido = async (req, res) => {
    try {
        const { id } = req.params
        const { ...actualizacion } = req.body

        const pedido = await Pedido.findById(id)

        if(!pedido){
            throw new Error('Pedido no existente')
        }
        // Actualizamos el pedido con los datos del body de la petición

        for(const key in actualizacion){
            if(actualizacion.hasOwnProperty(key)){
                pedido[key] = actualizacion[key]
            }
        }
        
        const pedidoAlmacenado = await pedido.save()
        const pedidoPopulado = await Pedido.findById(pedidoAlmacenado._id).populate('productosComprados.producto')
        res.json(pedidoPopulado)
    } catch (error) {
        const errorMessage = error.message || 'Error interno del servidor'
        res.status(error.statusCode || 500).json({msg: errorMessage})
    }
}

export {
    obtenerPedidosUsuario,
    obtenerPedidos,
    realizarPedido,
    actualizarPedido
}