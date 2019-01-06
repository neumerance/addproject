import React        from 'react';
import PropTypes    from 'prop-types';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter
}                   from 'reactstrap';

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  render() {
    return (
      <div>
        <div onClick={() => {this.toggle(true)}}>
          {this.props.children}
        </div>
        <Modal isOpen={this.state.open}>
          <ModalBody>
            {this.props.message}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" size={'xs'} onClick={this.confirm}>Yes</Button>{' '}
            <Button color="secondary" size={'xs'} onClick={() => {this.toggle(false)}}>No</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  confirm = (e) => {
    e.preventDefault();
    this.props.confirm();
    this.toggle(false);
  };

  toggle = (open = false) => {
    this.setState({ open });
  }
}

Confirm.propTypes = {
  message:  PropTypes.string.isRequired,
  confirm:  PropTypes.func.isRequired,
};

export default Confirm;
