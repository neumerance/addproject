import React        from 'react';
import PropTypes    from 'prop-types';
import { connect }  from 'react-redux';
import { 
  respondToRaiseHand
}                   from '../../actions/Rooms';

class RaiseHandAlert extends React.Component {
  respond = () => {
    this.props.respondToRaiseHand(this.props.stream);
  }

  render() {
    const stream = this.props.stream;
    const streamData = stream.getAttributes();
    return(
      <div onClick={this.respond}>
        <strong>{streamData.name}</strong> is raising hand <span className="fa fa-hand-paper"></span>
        {this.renderMessage()}
      </div>
    )
  }

  renderMessage() {
    if (!this.props.message) { return null }
    return (
      <p>{this.props.message}</p>
    )
  }
}

RaiseHandAlert.propTypes = {
  stream:             PropTypes.object.isRequired,
  message:            PropTypes.string,
  respondToRaiseHand: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { respondToRaiseHand })(RaiseHandAlert);