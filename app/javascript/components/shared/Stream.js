import React          from 'react';
import PropTypes      from 'prop-types';
import { connect }    from 'react-redux';

class Stream extends React.Component {
  render() {
    if (!this.props.stream) { return null }
    this.playWithRetry();
    return (
      <div id={this.props.stream.getID()} className="height-100 border border-danger"></div>
    )
  }

  componentWillUnmount() {
    if(!this.props.stream) { return null }
    this.props.stream.stop();
  }

  playWithRetry() {
    const self = this;
    let retry = setInterval(() => {
      console.log('self.containerExists()', self.containerExists());
      if (self.containerExists()) {
        self.play();
        clearInterval(retry);
      }
    }, 400);
    return null;
  }

  play() {
    const self = this;
    setTimeout(() => {
      self.props.stream.play(this.props.stream.getID());
    }, 0);
  }

  containerExists() {
    return $(`#${this.props.stream.getID()}`).length;
  }
}

Stream.propTypes = {
  stream: PropTypes.object,
  play:   PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Stream);
