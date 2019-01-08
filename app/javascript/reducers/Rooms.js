import {
  ROOMS_FETCH_ROOM,
  ROOMS_FETCH_ROOM_TOKEN,
  ROOMS_SET_SUBSCRIBERS,
  ROOMS_SET_ACTIVE_INDEX
}           from '../constants/Rooms';

const initialState = {
  room:         {},
  token:        '',
  subscribers:  [], // items should have { id: 1, altText: 'Slide 1', caption: 'Slide 1' }
  activeIndex:  0,
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
    default:
      return state
  }
}
