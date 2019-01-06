import React            from "react";
import { Provider }     from 'react-redux';
import store            from '../../store';
import RoomList         from './RoomList';
import CreateRoomModal  from './CreateRoomModal';
import {
  ToastContainer,
  toast
}                    from 'react-toastify';

class Main extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div className={'container'}>
          <div className={'col-md-8 offset-md-2'}>
            <div className={'bg-light rounded p-3'}>
              <RoomList />
              <CreateRoomModal />
              <ToastContainer />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default Main
