import {
  FETCH_ROOMS,
  SET_ROOMS
} from '../constants/Lobby'

export const getRooms = () => dispatch => {
  dispatch({ type: FETCH_ROOMS });
  fetch('/rooms.json')
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (res.rooms) {
        dispatch({ type: SET_ROOMS, payload: res.rooms });
      }
    });
};