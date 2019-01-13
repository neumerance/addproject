var N = require('../../licode/nuve');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
module.exports = function(opts, done) {
  N.API.init(opts.service_id, opts.service_key, opts.nuve_host);
  N.API.getRooms(function(roomList) {
    var rooms = JSON.parse(roomList);
    done(null, { rooms: rooms });
  }, function(e) {
    done(null, { errors: e })
  });
}
