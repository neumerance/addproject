import React          from 'react';
import { connect }    from 'react-redux';

class LocalStream extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.localStream !== nextProps.localStream) {
      setTimeout(() => {
        nextProps.localStream.play('localStream');
      }, 1000);
    }
  }
  
  render() {
    return (
      <div id={`localStream`} className="height-100 border border-danger"></div>
    )
  }
}

const mapStateToProps = state => ({
  localStream: state.rooms.localStream
});

export default connect(mapStateToProps, {})(LocalStream);
