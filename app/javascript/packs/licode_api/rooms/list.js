var args = process.argv.slice(2);
var N = require('../../licode/nuve');

// N.API.init(args[0], args[1], args[2]);
N.API.init(args[0], args[1], args[2]);

N.API.getRooms(function(roomList) {
  var rooms = JSON.parse(roomList);
  console.log('rooms', rooms);
  for(var i in rooms) {
    console.log('Room ', i, ':', rooms[i].name);
  }
}, function(e) {
  console.log('error', e)
});
