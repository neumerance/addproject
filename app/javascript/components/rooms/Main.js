import React              from "react";
import { Provider }       from 'react-redux';
import store              from '../../store';
import SubscriberCarousel from './SubscriberCarousel';
import RoomClient         from './RoomClient';
import LocalStream        from './LocalStream';
import {
  ToastContainer,
}                         from 'react-toastify';

class Main extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div className={'height-100'}>
          <RoomClient />
          <ToastContainer />
          <div className="row height-100">
            <div className="left-col col-md-9 height-100">
              <div className="height-80">
                <SubscriberCarousel />
              </div>
              <div className="height-20">

              </div>
            </div>
            <div className="right-col col-md-3 height-100">
              <div className="height-40">
                <LocalStream />
              </div>
              <div className="height-60">
              </div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default Main;
