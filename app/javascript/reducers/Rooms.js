import {
  ROOMS_FETCH_ROOM,
  ROOMS_FETCH_ROOM_TOKEN,
  ROOMS_SET_SUBSCRIBERS,
  ROOMS_SET_ACTIVE_INDEX,
  ROOMS_SET_LOCAL_STREAM,
  ROOMS_UPDATE_PROPS,
  ROOMS_SET_ACTIVE_STREAM,
  ROOMS_REMOVE_ACTIVE_STREAM,
  ROOMS_RAISE_HAND
}           from '../constants/Rooms';
import  RaiseHandAlert  from '../components/rooms/RaiseHandAlert';

const initialState = {
  room:         null,
  token:        '',
  subscribers:  [], // items should have { id: 1, altText: 'Slide 1', caption: 'Slide 1' }
  activeIndex:  0,
  localStream:  null,
  loading:      false,
  activeStream: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ROOMS_FETCH_ROOM:
      return {
        ...state,
        room: action.payload
      }
    case ROOMS_FETCH_ROOM_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case ROOMS_SET_SUBSCRIBERS:
      return {
        ...state,
        subscribers: action.payload
      }
    case ROOMS_SET_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: action.payload
      }
    case ROOMS_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.payload
      }
    case ROOMS_UPDATE_PROPS:
      return {
        ...state,
        ...action.payload
      }
    case ROOMS_RAISE_HAND:
      toast(<RaiseHandAlert stream={payload.stream} message={payload.message} />);
      return {
        ...state
      }
    case ROOMS_SET_ACTIVE_STREAM:
      return {
        ...state,
        activeStream: action.payload
      }
    case ROOMS_REMOVE_ACTIVE_STREAM:
      return {
        ...state,
        activeStream: null
      }
    default:
      return state
  }
}
