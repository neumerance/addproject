var N = require('../../licode/nuve');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
module.exports = function(opts, done) {
  N.API.init(opts.service_id, opts.service_key, opts.nuve_host);
  N.API.getRoom(opts.room_id, function(resp) {
    var room = JSON.parse(resp);
    done(null,  { room: room })
  }, function(e) {
    done(null, { error: e })
  });  
}
