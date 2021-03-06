var N = require('../../licode/nuve');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
module.exports = function(opts, done) {
  N.API.init(opts.service_id, opts.service_key, opts.nuve_host);
  N.API.getUsers(opts.room_id, function(users) {
    var user_lists = JSON.parse(users);
    done(null,  { users: user_lists })
  }, function(e) {
    done(null, { error: e })
  });  
}
