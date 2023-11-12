import Producto from "../models/Producto.js"
import multer from "multer"
import fs from 'fs'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './imagenes/productos'); // Directorio de destino para los archivos subidos
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop(); // Obtiene la extensión del archivo original
      cb(null, `${Date.now()}.${ext}`); // Asigna un nombre único al archivo
    },
});
  
const upload = multer({ storage }).single('imagen'); // 'file' debe coincidir con el nombre del campo en el formulario

const agregarProducto = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Hubo un error al cargar el archivo');
        }

        const { nombre } = req.body
        const existeProducto = await Producto.findOne({nombre})

        if(existeProducto){
            const error = new Error('Producto Existente')
            return res.status(400).json({msg: error.message})
        }
    
        try {
            const producto = await Producto(req.body)
            producto.imagen = req.file.filename
            producto.save()
            res.json(producto)
        } catch (error) {
            res.send(error)
        }
    })
}

const obtenerProductos = async (req, res) => {
    const productos = await Producto.find().select('-__v')
    res.json(productos)
}

const actualizarProducto = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Hubo un error al cargar el archivo');
        }
        const { id } = req.params;
        const { nombre, ...actualizacion } = req.body;

        try {
            const producto = await Producto.findById(id);

            if (!producto) {
                return res.status(404).json({ msg: 'Producto no encontrado' });
            }

            // Comprueba si el nombre se ha cambiado y si ya existe un producto con el nuevo nombre
            if (nombre && producto.nombre !== nombre) {
                const existeProducto = await Producto.findOne({ nombre });
                if (existeProducto) {
                    const error = new Error(`El producto ${nombre} ya se encuentra en el inventario`);
                    return res.status(400).json({ msg: error.message });
                }
            }

            producto.nombre = nombre

            for (const key in actualizacion) {
                if (actualizacion.hasOwnProperty(key)) {
                    producto[key] = actualizacion[key];
                }
            }

            if (req.file) {
                if (fs.existsSync(`./imagenes/productos/${producto.imagen}`)) {
                    fs.unlinkSync(`./imagenes/productos/${producto.imagen}`);
                }
                producto.imagen = req.file.filename;
            }

            const productoActualizado = await producto.save();
            res.json(productoActualizado);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Hubo un error al actualizar el producto' });
        }
    });
}

const eliminarProducto = async (req, res) => {

    const { id } = req.params
    const producto = await Producto.findById(id)

    try {
        if (fs.existsSync(`./imagenes/productos/${producto.imagen}`)) {
            fs.unlinkSync(`./imagenes/productos/${producto.imagen}`);
        }

        await producto.deleteOne()
        res.json({msg: 'Producto eliminado exitosamente'})
    } catch (error) {
        console.log(error)
    }
}

export {
    agregarProducto,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto
}