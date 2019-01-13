import React          from 'react';
import PropTypes      from 'prop-types';
import { connect }    from 'react-redux';

class Stream extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.stream !== nextProps.stream) {
      if (this.props.play) {
        this.playWithRetry();
      }
    }
  }
  
  render() {
    if (!this.props.stream) { return null }
    return (
      <div id={`stream-${this.props.stream.getID()}`} className="height-100 border border-danger"></div>
    )
  }

  playWithRetry() {
    const self = this;
    let retry = setInterval(() => {
      let container = self.streamContainer();
      if (container) {
        self.play();
        clearInterval(retry);
      }
    }, 400);
  }

  play() {
    const self = this;
    const cmd = setTimeout(() => {
      self.props.stream.play(self.streamContainer());
      clearTimeout(cmd);
      $('#bar_local').remove();
    }, 400);
  }

  streamContainer() {
    const container = $(`#stream-${this.props.stream.getID()}`);
    if (!container.length) { return }
    return `stream-${this.props.stream.getID()}`;
  }
}

Stream.propTypes = {
  stream: PropTypes.object,
  play:   PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Stream);
