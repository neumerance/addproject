import * as  _ from 'lodash';

export default class LicodeRoomClient {
  constructor(token = '', user={}, streamListCallback = () => {}) {
    this.token = token;
    this.user = user;
    this.localStream = Erizo.Stream({ 
      audio: true, video: true, data: true, videoSize: [640, 480, 640, 480],
      attributes: { user: user } 
    });
    this.room = Erizo.Room({token: this.token});
    this.streamListCallback = streamListCallback;
    this.streams = [];
  }

  init() {
    const self = this;
    self.localStream.addEventListener('access-accepted', () => {
      self.listenToRoomEvents();

      self.room.connect();
    });
    self.localStream.init();
  }

  listenToRoomEvents() {
    const self = this;
    self.connectedToRoom();
    self.streamDidAdded();
    self.streamDidSubscribed();
    self.streamDidUnsubscribe();
  }

  connectedToRoom() {
    const self = this;
    self.room.addEventListener('room-connected', (roomEvent) => {
      self.room.publish(self.localStream, { maxVideoBW: 300 });
      self.subscribeToStreams(roomEvent.streams);      
    });
  }

  streamDidAdded() {
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
      self.streams.push(stream);
      self.streamListCallback(self.streams);
    });
  }

  streamDidUnsubscribe() {
    const self = this;
    self.room.addEventListener('stream-removed', (streamEvent) => {
      const stream = streamEvent.stream;
      _.remove(self.streams, stream_item => { return stream === stream_item });
      self.streamListCallback(self.streams);
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