var N = require('../../licode/nuve');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
module.exports = function(opts, done) {
  N.API.init(opts.service_id, opts.service_key, opts.nuve_host);
  N.API.createToken(opts.params.id, opts.params.name, opts.params.role, function(token) {
    done(null,  { token: token })
  }, function(e) {
    done(null, { error: e })
  });  
}
