import LoteImportacion from "../models/LoteImportacion.js"  

const registrarImportacion = async (req, res) => {
    try {
        const loteImportacion = await LoteImportacion(req.body.cotizacion)
        await loteImportacion.save()

        const lotePopulado = await LoteImportacion.findById(loteImportacion._id).populate('productos_importados.producto');
        res.json(lotePopulado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerImportaciones = async (req, res) => {
    try {
        const importaciones = await LoteImportacion.find().populate('productos_importados.producto');
        res.json(importaciones);
    } catch (error) {
        console.error("Error al obtener las importaciones:", error);
    }    
}


export {
    registrarImportacion,
    obtenerImportaciones,
}