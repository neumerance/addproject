export default class LicodeRoomClient {
  constructor(token = '', user={}, streamListCallback = () => {}) {
    this.token = token;
    this.user = user;
    this.localStream = Erizo.Stream({ 
      audio: true, video: true, data: true, 
      attributes: { user: user } 
    });
    this.room = Erizo.Room({token: this.token});
    this.streamListCallback = streamListCallback;
    this.streams = [];
  }

  init() {
    this.localStream.addEventListener('access-accepted', () => {
      this.listenToRoomConnection();
      this.room.connect();
      this.localStream.play(self.localStreamContainer);
    });
    this.localStream.init();
  }

  listenToRoomConnection() {
    const self = this;
    self.room.addEventListener('room-connected', (roomEvent) => {
      self.room.publish(self.localStream);
      self.subscribeToStreams(roomEvent.streams);
      self.streamAdded();
      self.streamDidSubscribed();
      self.streamDidUnsubscribe();
    });
  }

  streamAdded() {
    const self = this;
    self.room.addEventListener('stream-added', (streamEvent) => {
      const streams = [];
      streams.push(streamEvent.stream);
      self.subscribeToStreams(streams);
    });
  }

  streamDidSubscribed() {
    const self = this;
    self.room.addEventListener('stream-subscribed', (streamEvent) => {
      const stream = streamEvent.stream;
      self.stream.push(stream);
      self.streamListCallback(self.streams);
    });
  }

  streamDidUnsubscribe() {
    const self = this;
    self.room.addEventListener('stream-removed', (streamEvent) => {
      const stream = streamEvent.stream;
      // Todo: purge stream here
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