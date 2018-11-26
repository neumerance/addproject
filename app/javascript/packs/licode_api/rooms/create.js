var args = process.argv.slice(2);
var N = require('../../licode/nuve');

N.API.init(args[0], args[1], args[2]);

var room = {
  name: args[3],
  description: args[4] || '',
  p2p: args[5] || false
}

N.API.createRoom(room.name, function(room) {
  console.log('Room created with id: ', room._id);
}, function(e) {
  console.log('error: ', e)
}, {
  data: {
    room_description: room.description
  },
  p2p: room.p2p
});
