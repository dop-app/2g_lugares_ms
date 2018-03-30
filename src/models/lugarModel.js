'use strict';
var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;


var LugarSchema = new Schema(
{

  _id: Number,


  nombre: {
    type: String,
    required: 'Por favor ingrese el nombre del lugar'
  },

    nivelPrecio: {
    type: String,
    enum: ['FREE', 'INEXPENSIVE', 'MODERATE', 'EXPENSIVE', 'VERY_EXPENSIVE','UNKNOWN'],
    default: ['UNKNOWN']    
  },
    ubicacion: {
    	type: mongoose.Schema.Types.Point,
    	index: '2dsphere'
    },

    direccion: {
    type: String   
  },
    horario: {
    type: String   
  },
    calificacion: {
    type: Number,
    min: 1, 
    max: 5   
  },
    tipo: {
    type: String   
  },
    ciudad: {
    type: String   
  },
    pais: {
    type: String   
  }  
},{ _id: false });
LugarSchema.plugin(AutoIncrement);

module.exports = mongoose.model('Lugares', LugarSchema);