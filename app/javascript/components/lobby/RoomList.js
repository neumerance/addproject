import React        from "react";
import { connect }  from 'react-redux';
import {
  Table,
  Button
}                   from 'reactstrap';
import PropTypes    from 'prop-types';
import {
  getRooms,
  toggleCreate,
  deleteRoom,
  requestMediaAccess
}                    from '../../actions/Lobby';
import Confirm      from '../shared/Confirm';

class RoomList extends React.Component {
  componentDidMount() {
    this.props.getRooms();
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-between mb-2">
          <h4>Channels</h4>
          <Button color={'warning'} size={'sm'} onClick={this.toggle}>New Room</Button>
        </div>
        <Table borderless size="sm">
          <thead>
          <tr>
            <th>Channel</th>
            <th>Description</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {this.renderRooms()}
          </tbody>
        </Table>
      </div>
    )
  }

  renderRooms() {
    if (!this.props.rooms.length) {
      return (
        <tr><td colSpan={3} className={'text-center'}>No room available yet.</td></tr>
      )
    }
    return this.props.rooms.map((room, key) => {
      return (
        <tr key={`room_${key}`}>
          <td>
            <a onClick={(e) => { this.showRoom(e, room._id) }}>{room.name}</a>
          </td>
          <td>
            {room.data.room_description}
          </td>
          <td>
            <Confirm message={`Are you sure you want to delete ${room.name}`} confirm={() => {this.delete(room._id)}}>
              <Button size={'sm'} color={'danger'}>Delete</Button>
            </Confirm>
          </td>
        </tr>
      )
    });
  }

  toggle = () => {
    this.props.toggleCreate(true);
  };

  delete = (room_id) => {
    this.props.deleteRoom({room_id: room_id});
  };

  showRoom = (e, room_id) => {
    e.preventDefault();
    const url = `/rooms/${room_id}`;
    this.props.requestMediaAccess(() => {
      location.href = url;
    })
  }
}

RoomList.propTypes = {
  rooms:              PropTypes.array.isRequired,
  getRooms:           PropTypes.func.isRequired,
  toggleCreate:       PropTypes.func.isRequired,
  deleteRoom:         PropTypes.func.isRequired,
  requestMediaAccess:  PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  rooms:    state.lobby.rooms,
  loading:  state.lobby.loading
});

export default connect(mapStateToProps, {
  getRooms,
  toggleCreate,
  deleteRoom,
  requestMediaAccess
})(RoomList);
