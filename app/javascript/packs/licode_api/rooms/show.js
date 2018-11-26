var N = require('../../licode/nuve');
module.exports = function(opts, done) {
  N.API.init(opts.service_id, opts.service_key, opts.nuve_host);
  N.API.getRoom(opts.room_id, function(resp) {
    var room = JSON.parse(resp);
    done(null,  { room: room })
  }, function(e) {
    done(null, { error: e })
  });  
}
