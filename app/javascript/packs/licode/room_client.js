export default class LicodeRoomClient {
  // subscriberContainer
  // it should be a selector of a DOM
  // which newly subscribed user will be appended
  constructor(room_token = '', user={}, localStreamContainer = '', subscriberContainer = '') {
    this.token = room_token;
    this.user = user;
    this.localStream = Erizo.Stream({ audio: true, video: true, data: true });
    this.room = Erizo.Room({token: this.token});
    this.subscriberContainer = $(subscriberContainer);
    this.localStreamContainer = localStreamContainer;
    this.localStream.addEventListener('access-accepted', () => {
      this.listenToRoomConnection();
      this.room.connect();
      this.localStream.play(self.localStreamContainer);
    });
    this.streams = []
  }

  listenToRoomConnection() {
    const self = this;
    self.room.addEventListener('room-connected', (roomEvent) => {
      self.room.publish(self.localStream);
      self.subscribeToStreams(roomEvent.streams);
      self.listenToAddedStream();
      self.renderStreamSubscriptions();
      self.listenToWillUnsubscribe();
    });
  }

  listenToAddedStream() {
    const self = this;
    self.room.addEventListener('stream-added', (streamEvent) => {
      const streams = [];
      streams.push(streamEvent.stream);
      self.subscribeToStreams(streams);
    });
  }

  renderStreamSubscriptions() {
    const self = this;
    self.room.addEventListener('stream-subscribed', (streamEvent) => {
      const stream = streamEvent.stream;
      const div = document.createElement('div');
      const id = `subscriber-${stream.getID()}`
      div.setAttribute('style', 'width: 320px; height: 240px;');
      div.setAttribute('id', id);
      self.subscriberContainer.append(div);
      setTimeout(() => {
        // Todo: only play streams by batch of 6 per queue in 10 sec
        // Todo: pause those stream that are not inqueue
        stream.play(id);
      }, 100);
    });
  }

  listenToWillUnsubscribe() {
    const self = this;
    self.room.addEventListener('stream-removed', (streamEvent) => {
      const stream = streamEvent.stream;
      if (stream.elementID !== undefined) {
        $(stream.elementID).remove();
      }
    });
  }

  subscribeToStreams(streams) {
    const self = this;
    streams.forEach(stream => {
      if (self.localStream.getID() !== stream.getID()) {
        self.room.subscribe(stream);
      }
    });
  }
}