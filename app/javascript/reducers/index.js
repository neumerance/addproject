import { combineReducers }  from 'redux'
import Lobby                from '../reducers/Lobby'
import Rooms                from '../reducers/Rooms'

export default combineReducers({
  lobby: Lobby,
  rooms: Rooms,
});

