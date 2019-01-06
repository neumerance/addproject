import {
  FETCH_ROOMS,
  SET_ROOMS
} from '../constants/Lobby'

const initialState = {
  rooms: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      return {
        ...state,
        loading: true,
      };
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload
      };
    default:
      return state
  }
}
