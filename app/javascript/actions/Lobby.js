import {
  LOBBY_FETCH_ROOMS,
  LOBBY_SET_ROOMS,
  LOBBY_UPDATE_PROPS,
  LOBBY_SET_CREATE_ROOM_PARAMS
}                 from '../constants/Lobby'
import { toast }  from 'react-toastify';

export const getRooms = () => dispatch => {
  dispatch({ type: LOBBY_FETCH_ROOMS });
  fetch('/rooms.json')
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (res.rooms) {
        dispatch({ type: LOBBY_SET_ROOMS, payload: res.rooms });
      } else {
        toast.error('Unable fetch rooms')
      }
    });
};

export const createRoom = (params) => dispatch => {
  if (!params.name) {  toast.error('Room name is required'); return }
  if (!params.description) {  toast.error('Room description is required'); return }
  dispatch({ type: LOBBY_FETCH_ROOMS });
  fetch('rooms.json', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  })
  .then(res => {
    return res.json()
  })
  .then(res => {
    if (res.rooms) {
      dispatch({ type: LOBBY_SET_ROOMS, payload: res.rooms });
    } else {
      toast.error('Unable to create room, please try again');
    }
    dispatch(toggleCreate(false));
    dispatch(resetRoomParams());
  });
};

export const deleteRoom = (params) => dispatch => {
  dispatch({ type: LOBBY_FETCH_ROOMS });
  fetch(`rooms/${params.room_id}.json`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(res => {
    return res.json()
  })
  .then(res => {
    if (res.rooms) {
      dispatch({ type: LOBBY_SET_ROOMS, payload: res.rooms });
    } else {
      toast.error('Unable to delete room, please try again');
    }
  });
};

export const toggleCreate = (bool = false) => dispatch => {
  dispatch({ type: LOBBY_UPDATE_PROPS, payload: { creating: bool } });
};

export const setCreateRoomParams = (params) => dispatch => {
  dispatch({ type: LOBBY_SET_CREATE_ROOM_PARAMS, payload: { room_params: params} });
};

export const resetRoomParams = () => dispatch => {
  dispatch({
    type: LOBBY_SET_CREATE_ROOM_PARAMS,
    payload: {
      room_params: {
        name: '',
        description: '',
        conference: false
      }
    }
  });
};


export const requestMediaAccess = (callbackOnSuccess = () => {}) => dispatch => {
  navigator.mediaDevices.getUserMedia({audio: true, video: true})
  .then((stream) => {
    callbackOnSuccess();
  })
  .catch((err) => {
    console.log('requestMediaAccess: ', err);
    toast.error('Unable to get access to you webcam and mic. Please try again');
  });
}