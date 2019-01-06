import React         from "react";
import { Provider }  from 'react-redux';
import store         from '../../store';
import RoomList      from './RoomList';

class Main extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div className={'container'}>
          <div className={'col-md-6 offset-md-3'}>
            <div className={'bg-light border'}>
              <RoomList/>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default Main
