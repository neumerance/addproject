var N = require('../../licode/nuve');
module.exports = function(opts, done) {
  N.API.init(opts.service_id, opts.service_key, opts.nuve_host);
  N.API.createToken(opts.params.room_id, opts.params.name, opts.params.role, function(token) {
    done(null,  { token: token })
  }, function(e) {
    done(null, { error: e })
  });  
}
