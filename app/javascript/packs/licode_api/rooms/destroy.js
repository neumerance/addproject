var N = require('../../licode/nuve');
module.exports = function(opts, done) {
  N.API.init(opts.service_id, opts.service_key, opts.nuve_host);
  N.API.deleteRoom(opts.room_id, function(resp) {
    done(null,  { result: resp })
  }, function(e) {
    done(null, { error: e })
  });  
}
