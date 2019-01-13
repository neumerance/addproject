import React        from 'react';
import PropTypes    from 'prop-types';
import { connect }  from 'react-redux';
import { Button }   from 'reactstrap';
import {
  sendStreamData,
  receiveStreamData
}                   from '../../actions/Rooms';
import {
  ROOMS_RAISE_HAND,
}                   from '../../constants/Rooms';

class RaiseHandButton extends React.Component {
  render() {
    return (
      <div className="raise-hand-button">
        <Button size={'sm'} color={'danger'} onClick={this.raiseHand}>
          <i className="fa fa-hand-paper-o"></i> Raise hand
        </Button>
      </div>
    )
  }

  raiseHand = (e) => {
    e.preventDefault();
    this.props.sendStreamData(this.props.localStream, ROOMS_RAISE_HAND);
  }
}

RaiseHandButton.propTypes = {
  stream:             PropTypes.object,
  sendStreamData:     PropTypes.func.isRequired,
  receiveStreamData:  PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  localStream:  state.rooms.localStream,
});

export default connect(mapStateToProps, { 
  receiveStreamData,
  sendStreamData
})(RaiseHandButton);
