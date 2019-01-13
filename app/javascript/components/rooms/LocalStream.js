import React          from 'react';
import { connect }    from 'react-redux';
import Stream         from '../shared/Stream';

class LocalStream extends React.Component {
  render() {
    return (
      <Stream stream={this.props.localStream} play />
    )
  }
}

const mapStateToProps = state => ({
  localStream: state.rooms.localStream
});

export default connect(mapStateToProps, {})(LocalStream);
