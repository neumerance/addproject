import React          from 'react';
import PropTypes      from 'prop-types';
import { connect }    from 'react-redux';

class Stream extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.stream !== nextProps.stream) {
      setTimeout(() => {
        nextProps.stream.play(`stream-${nextProps.stream.getID()}`);
      }, 1000);
    }
  }
  
  render() {
    if (!this.props.stream) { return null }
    return (
      <div id={`stream-${this.props.stream.getID()}`} className="height-100 border border-danger"></div>
    )
  }
}

Stream.propTypes = {
  stream: PropTypes.object,
  play:   PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Stream);
