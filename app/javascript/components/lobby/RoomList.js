import React        from "react";
import { connect }  from 'react-redux';
import { Table }    from 'reactstrap';
import PropTypes    from 'prop-types';
import { getRooms } from '../../actions/Lobby'

class RoomList extends React.Component {
  componentDidMount() {
    this.props.getRooms();
  }

  render() {
    return (
      <Table>
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
    )
  }

  renderRooms() {
    return this.props.rooms.map(room => {
      return (
        <tr>
          <td>
            {room.name}
          </td>
          <td>
            {room.data.description}
          </td>
        </tr>
      )
    });
  }
}

RoomList.propTypes = {
  rooms:    PropTypes.array.isRequired,
  getRooms: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  rooms:    state.lobby.rooms,
  loading:  state.lobby.loading
});

export default connect(mapStateToProps, { getRooms })(RoomList);
