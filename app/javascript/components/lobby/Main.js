import React         from "react"
import { Provider }  from 'react-redux'
import store         from '../../store'

class Main extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <h1>Lobby here</h1>
        </div>
      </Provider>
    );
  }
}

export default Main
