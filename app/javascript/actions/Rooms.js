import {
  ROOMS_FETCH_ROOM,
  ROOMS_FETCH_ROOM_TOKEN,
  ROOMS_SET_SUBSCRIBERS,
  ROOMS_SET_ACTIVE_INDEX
}           from '../constants/Rooms';

export const setActiveIndex = (index) => dispatch => {
  dispatch({ type: ROOMS_SET_ACTIVE_INDEX, payload: index });
}
