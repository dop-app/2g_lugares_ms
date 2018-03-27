'use strict';
var turf = require('@turf/turf')
var mongoose = require('mongoose'),
  Lugar = mongoose.model('Lugares');

exports.list_all_lugares = function(req, res) {
  Lugar.find({}, function(err, lugar) {
    if (err)
      res.send(err);
    res.json(lugar);
  });
};


exports.create_a_lugar = function(req, res) {
  var new_lugar = new Lugar(req.body);
  new_lugar.save(function(err, lugar) {
    if (err)
      res.send(err);
    res.json(lugar);
  });
};


exports.read_a_lugar = function(req, res) {
  Lugar.findById(req.params.lugarId, function(err, lugar) {
    if (err)
      res.send(err);
    res.json(lugar);
  });
};

exports.findLocation= function(req, res) {  
    var limit = 10;
    var point1 = turf.point([parseFloat(req.params.lugarLon), parseFloat(req.params.lugarLat)]);
    var point2 = turf.point([parseFloat(req.params.lugarLon1), parseFloat(req.params.lugarLat1)]);
    var midpoint = turf.midpoint(point1, point2);
    //console.log(midpoint);
    // get the max distance or set it to 8 kilometers
    
    console.log(midpoint.geometry.coordinates[0]);
    console.log(midpoint.geometry.coordinates[1]);
   
    var distance = turf.distance(point1, midpoint, {units: 'kilometers'});
    console.log(distance);
     var maxDistance = distance*1000;
    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    //maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = parseFloat(midpoint.geometry.coordinates[0]);
    coords[1] = parseFloat(midpoint.geometry.coordinates[1]);
    console.log(maxDistance);
    // find a location
    Lugar.find({
      ubicacion: {
        $near: { 
            $geometry: {
                type: {
                    type: String,
                    default: "Point"
                },
                coordinates: coords,
                index: '2dsphere'
            },

            $maxDistance: maxDistance
        }
      }
    }, function(err, lugar) {
       if (err)
        res.send(err);
    res.json(lugar);
 });
};


exports.update_a_lugar = function(req, res) {
  Lugar.findOneAndUpdate({_id: req.params.lugarId}, req.body, {new: true}, function(err, lugar) {
    if (err)
      res.send(err);
    res.json(lugar);
  });
};


exports.delete_a_lugar = function(req, res) {


  Lugar.remove({
    _id: req.params.lugarId
  }, function(err, lugar) {
    if (err)
      res.send(err);
    res.json({ message: 'Lugar exitosamente eliminado' });
  });
};