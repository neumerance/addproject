import React, { Component } from 'react';
import PropsTypes           from 'prop-types';
import { connect }          from 'react-redux';
import {
  setActiveIndex
}                           from '../../actions/Rooms';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
}                           from 'reactstrap';

class SubscriberCarousel extends Component {
  onExiting = () => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
  }

  next = () => {
    if (this.animating) return;
    let nextIndex = this.props.activeIndex === this.props.subscribers.length - 1 ? 0 : this.props.activeIndex + 1;
    if (!this.props.subscribers.length) { nextIndex = 0 }
    this.props.setActiveIndex(nextIndex);
  }

  previous = () => {
    if (this.animating) return;
    let nextIndex = this.props.activeIndex === 0 ? this.props.subscribers.length - 1 : this.props.activeIndex - 1;
    if (!this.props.subscribers.length) { nextIndex = 0 }
    this.props.setActiveIndex(nextIndex);
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.props.setActiveIndex(newIndex);
  }

  renderCarouseItems() {
    if (!this.props.subscribers.length) { return [this.renderEmptyCarouselItem()] }
    return this.props.subscribers.map((item) => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
        >
          <CarouselCaption className="text-danger" captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
  }

  renderEmptyCarouselItem() {
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={1}
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        <CarouselCaption 
          className="text-danger" 
          captionText={'no one on this channel yet'} 
          captionHeader={'Waiting for participants'} />
      </CarouselItem>
    );
  }

  render() {
    const { activeIndex } = this.props;
    return (
      <div>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={this.props.subscribers} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {this.renderCarouseItems()}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}

SubscriberCarousel.propTypes = {
  subscribers:    PropsTypes.array.isRequired,
  token:          PropsTypes.string.isRequired,
  activeIndex:    PropsTypes.number.isRequired,
  setActiveIndex: PropsTypes.func.isRequired,
}

const mapStateToProps = state => ({
  subscribers:  state.rooms.subscribers,
  room:         state.rooms.room,
  token:        state.rooms.token,
  activeIndex:  state.rooms.activeIndex
});

export default connect(mapStateToProps, { setActiveIndex })(SubscriberCarousel);
