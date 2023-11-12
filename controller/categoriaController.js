import Categoria from '../models/Categoria.js'
import multer from "multer"
import fs from 'fs'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './imagenes/categorias'); // Directorio de destino para los archivos subidos
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop(); // Obtiene la extensión del archivo original
      cb(null, `${Date.now()}.${ext}`); // Asigna un nombre único al archivo
    },
});
  
const upload = multer({ storage }).single('imagen'); // 'file' debe coincidir con el nombre del campo en el formulario

const registrarCategoria = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Hubo un error al cargar el archivo');
        }

        const { nombre } = req.body
        const existeCategoria = await Categoria.findOne({nombre})

        if(existeCategoria){
            const error = new Error('Categoria Existente')
            return res.status(400).json({msg: error.message})
        }
    
        try {
            const categoria = await Categoria(req.body)
            categoria.imagen = req.file.filename
            categoria.save()
            res.json(categoria)
        } catch (error) {
            res.send(error)
        }
    })
}

const obtenerCategorias = async (req, res) => {
    const categorias = await Categoria.find()
    res.json(categorias)
}

export {
    registrarCategoria,
    obtenerCategorias
}