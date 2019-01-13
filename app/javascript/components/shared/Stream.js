import React          from 'react';
import PropTypes      from 'prop-types';
import { connect }    from 'react-redux';

class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamID: null
    }
  }
  
  componentWillReceiveProps(nextProps) {
    const self = this;
    if (self.props.stream !== nextProps.stream) {
      if (self.props.play) {
        self.setState({
          streamID: nextProps.stream.getID()
        }, self.playWithRetry)
      }
    }
  }
  
  render() {
    if (!this.props.stream) { return null }
    return (
      <div id={this.state.streamID} className="height-100 border border-danger"></div>
    )
  }

  playWithRetry() {
    const self = this;
    let retry = setInterval(() => {
      if (self.containerExists()) {
        self.play();
        clearInterval(retry);
      }
    }, 400);
  }

  play() {
    const self = this;
    setTimeout(() => {
      self.props.stream.play(this.state.streamID);
    }, 0);
  }

  containerExists() {
    return $(`#${this.state.streamID}`).length;
  }
}

Stream.propTypes = {
  stream: PropTypes.object,
  play:   PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Stream);
