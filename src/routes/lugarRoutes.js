'use strict';
module.exports = function(app) {
  var lugar = require('../controllers/lugarController');

  // lugar Routes
  app.route('/lugares')
    .get(lugar.list_all_lugares)
    .post(lugar.create_a_lugar);


  app.route('/lugares/:lugarId')
    .get(lugar.read_a_lugar)
    .put(lugar.update_a_lugar)
    .delete(lugar.delete_a_lugar);

  app.route('/lugarin/:lugarLat&:lugarLon&:lugarLat1&:lugarLon1')
	.get(lugar.findLocation);
};
