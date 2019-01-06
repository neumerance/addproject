import {
  LOBBY_FETCH_ROOMS,
  LOBBY_SET_ROOMS,
  LOBBY_UPDATE_PROPS,
  LOBBY_SET_CREATE_ROOM_PARAMS
} from '../constants/Lobby'

const initialState = {
  rooms: [],
  loading: false,
  errors: [],
  creating: false,
  room_params: {
    name: null,
    description: null,
    conference: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOBBY_FETCH_ROOMS:
      return {
        ...state,
        loading: true,
      };
    case LOBBY_SET_ROOMS:
      return {
        ...state,
        rooms: action.payload
      };
    case LOBBY_UPDATE_PROPS:
      return {
        ...state,
        ...action.payload
      };
    case LOBBY_SET_CREATE_ROOM_PARAMS:
      return {
        ...state,
        room_params: {
          ...state.room_params,
          ...action.payload
        }
      };
    default:
      return state
  }
}
