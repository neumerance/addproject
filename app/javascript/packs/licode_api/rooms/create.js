var N = require('../../licode/nuve');
module.exports = function(opts, done) {
  N.API.init(opts.service_id, opts.service_key, opts.nuve_host);
  N.API.createRoom(opts.params.name || 'default-'+new Date().getTime(), function(room) {
    done(null, { room: room });
  }, function(e) {
    done(null, { errors: e })
  }, {
    data: {
      room_description: opts.params.description || '',
      conference: opts.params.conference || true
    },
    p2p: opts.params.p2p || false
  });
}
