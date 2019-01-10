import React          from 'react';
import PropTypes      from 'prop-types';
import { connect }    from 'react-redux';
import { 
  initRoomClient,
  setSubscribers
}                     from '../../actions/Rooms';

class RoomClient extends React.Component {
  componentDidMount() {
    this.props.initRoomClient(this.props.setSubscribers);
  }

  render() {
    return (<span></span>)
  }
}

RoomClient.propTypes = {
  initRoomClient: PropTypes.func.isRequired,
  setSubscribers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { 
  initRoomClient,
  setSubscribers
})(RoomClient);