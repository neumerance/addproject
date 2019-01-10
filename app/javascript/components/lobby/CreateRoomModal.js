import React        from 'react';
import PropTypes    from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
}                   from 'reactstrap';
import Toggle       from 'react-toggle';
import { connect }  from 'react-redux';
import {
  createRoom,
  toggleCreate,
  setCreateRoomParams
}                    from "../../actions/Lobby";

class CreateRoomModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.creating} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>New Room</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Name</Label>
            <Input 
              type="text" 
              placeholder="Name of the room" 
              disabled={this.props.loading}
              onChange={(e) => { this.setParams('name', e.target.value) }} />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input 
              type="textarea" 
              disabled={this.props.loading}
              onChange={(e) => { this.setParams('description', e.target.value) }} />
          </FormGroup>
          <FormGroup>
            <div className="d-flex flex-row">
              <div>
                <Toggle
                  className="mr-2"
                  disabled={this.props.loading}
                  defaultChecked={this.props.room_params.conference}
                  onChange={(e) => { this.setParams('conference', e.target.checked) }} />
              </div>
              <div>
                Enable conferencing
                {this.conferenceFieldNote()}
              </div>
            </div>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.create} size={'sm'} disabled={this.props.loading}>Create Room</Button>{' '}
          <Button color="secondary" onClick={this.toggle} size={'sm'} disabled={this.props.loading}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  create = () => {
    this.props.createRoom(this.props.room_params);
  };

  toggle = () => {
    this.props.toggleCreate(false);
  };

  setParams = (field, value) => {
    const params = this.props.room_params;
    params[field] = value;
    this.props.setCreateRoomParams(params)
  };

  conferenceFieldNote() {
    let text = '';
    if (this.props.room_params.conference) {
      text = 'Subscribers are able to raise hand and to talk, share screen and etc.'
    } else {
      text = 'Subscribers can only watch what the room master is saying or showing.'
    }
    return (
      <p className="text-muted">{text}</p>
    )
  }
}

CreateRoomModal.propTypes = {
  createRoom:           PropTypes.func.isRequired,
  toggleCreate:         PropTypes.func.isRequired,
  creating:             PropTypes.bool.isRequired,
  setCreateRoomParams:  PropTypes.func.isRequired,
  loading:              PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  creating:     state.lobby.creating,
  room_params:  state.lobby.room_params,
  loading:      state.lobby.loading
});

export default connect(mapStateToProps, {
  createRoom,
  toggleCreate,
  setCreateRoomParams
})(CreateRoomModal);
