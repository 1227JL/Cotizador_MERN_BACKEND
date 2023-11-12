// Importar Mongoose
import mongoose from 'mongoose';

// Definir el esquema del modelo de Lote de Importación
const loteImportacionSchema = mongoose.Schema({
  cobro_impuestos: {
    type: Number,
    required: true
  },
  costo_flete_interno_por_tonelada: {
    type: Number,
    required: true
  },
  costo_importacion_metro_cubico: {
    type: Number,
    required: true
  },
  fecha_importacion: {
    type: Date,
    default: Date.now,
    required: true
  },
  ganancia_total: {
    type: Number,
    required: true
  },
  gasto_total: {
    type: Number,
    required: true
  },
  impuesto_iva_porcentaje: {
    type: Number,
    required: true
  },
  peso_total: {
    type: Number,
    required: true
  },
  porcentaje_ganancia: {
    type: Number,
    required: true
  },
  productos_importados: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true },
      costo_importacion_metro_cubico: { type: Number, required: true },
      arancel_porcentaje: { type: Number, required: true },
      costo_flete_interno_por_tonelada: { type: Number, required: true },
      impuesto_iva_porcentaje: { type: Number, required: true },
      precio_venta: { type: Number, required: true },
      descuento_porcentaje: Number,
      unidades_disponibles: Number
    }
  ],  
  unidades: {
    type: Number,
    required: true
  },
  volumen_total: {
    type: Number,
    required: true
  }
});

// Crear el modelo de Lote de Importación
const LoteImportacion = mongoose.model('LoteImportacion', loteImportacionSchema);

// Exportar el modelo
export default LoteImportacion;
