import {
  ROOMS_FETCH_ROOM,
  ROOMS_FETCH_ROOM_TOKEN,
  ROOMS_SET_SUBSCRIBERS,
  ROOMS_SET_ACTIVE_INDEX,
  ROOMS_SET_LOCAL_STREAM,
  ROOMS_RAISE_HAND,
  ROOMS_SET_ACTIVE_STREAM,
  ROOMS_UPDATE_PROPS,
}                         from '../constants/Rooms';
import { toast }          from 'react-toastify';
import LicodeRoomClient   from '../packs/licode/LicodeRoomClient';

export const setActiveIndex = (index) => dispatch => {
  dispatch({ type: ROOMS_SET_ACTIVE_INDEX, payload: index });
}

export const initRoomClient = (streamListCallback = () => {}) => dispatch => {
  dispatch({ type: ROOMS_UPDATE_PROPS, loading: true });
  dispatch(fetchRoom(window.ROOM_ID, room => {
    dispatch(fetchRoomToken({ room_id: room._id, role: 'viewerWithData', name: window.USER.email }, token => {
      const client = new LicodeRoomClient(token, window.USER, streamListCallback);
      dispatch({ type: ROOMS_SET_LOCAL_STREAM, payload: client.localStream }); 
      dispatch({ type: ROOMS_UPDATE_PROPS, loading: false });
      client.init();
    }));
  }))
}

export const fetchRoom = (room_id, callback = () => {}) => dispatch => {
  dispatch({ type: ROOMS_UPDATE_PROPS, payload: { loading: true } });
  fetch(`/rooms/${room_id}.json`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (res.room) {
        dispatch({ type: ROOMS_FETCH_ROOM, payload: res.room });
        callback(res.room);
      } else {
        toast.error('Unable fetch room')
      }
      dispatch({ type: ROOMS_UPDATE_PROPS, payload: { loading: false } });
    });
}

export const fetchRoomToken = (params, callback = () => {}) => dispatch => {
  dispatch({ type: ROOMS_UPDATE_PROPS, payload: { loading: true } });
  fetch(`/rooms/${params.room_id}/create_token.json`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (res.token) {
        dispatch({ type: ROOMS_FETCH_ROOM_TOKEN, payload: res.token });
        callback(res.token);
      } else {
        toast.error('Unable fetch room token')
      }
      dispatch({ type: ROOMS_UPDATE_PROPS, payload: { loading: false } });
    });
}

export const setSubscribers = (streams = []) => dispatch => {
  dispatch({ type: ROOMS_SET_SUBSCRIBERS, payload: streams });
}


export const raiseHand = (stream, message = null) => dispatch => {
  dispatch({ type: ROOMS_RAISE_HAND, payload: { stream, message } });
}

export const respondToRaiseHand = (stream) => dispatch => {
  dispatch({ type: ROOMS_SET_ACTIVE_STREAM, payload: stream });
}

export const sendStreamData = (stream, type, data = {}) => dispatch => {
  stream.sendData({ type: type, data: data });
}

export const receiveStreamData = () => dispatch => {
  stream.addEventListener('stream-data', (evt) => {
    const stream = evt.stream;
    switch(evt.type) {
      case ROOMS_RAISE_HAND:
        dispatch(raiseHand(stream, evt.data.message));
      case ROOMS_SET_ACTIVE_STREAM:
        dispatch(respondToRaiseHand(stream));
      case ROOMS_REMOVE_ACTIVE_STREAM:
        dispatch({ type: ROOMS_REMOVE_ACTIVE_STREAM });
    }
  });
}