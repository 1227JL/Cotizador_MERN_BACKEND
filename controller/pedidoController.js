import Pedido from "../models/Pedido.js"

const obtenerPedidos = async (req, res) => {
    const pedidos = await Pedido.find()
    res.json(pedidos)
}

const realizarPedido = async (req, res) => {
    try {
        const pedidoAlmacenado = await Pedido(req.body)
        await pedidoAlmacenado.save()
        res.json(pedidoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

export {
    obtenerPedidos,
    realizarPedido
}