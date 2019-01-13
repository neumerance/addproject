import React            from 'react';
import { connect }      from 'react-redux';
import Stream           from '../shared/Stream';
import RaiseHandButton  from './RaiseHandButton';

class LocalStream extends React.Component {
  render() {
    return (
      <div className="relative height-100">
        <Stream stream={this.props.localStream} play />
        <RaiseHandButton />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  localStream: state.rooms.localStream
});

export default connect(mapStateToProps, {})(LocalStream);
