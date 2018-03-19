'use strict';

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