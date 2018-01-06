import React, { Component } from 'react';
import { Label, Icon, Header } from 'semantic-ui-react';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.onSlideStart = this.onSlideStart.bind(this);
    this.onSlideMove = this.onSlideMove.bind(this);
    this.onSlideEnd = this.onSlideEnd.bind(this);

    this.state = {
        initialX: null,
        mouseDown: false
    };
  }

  onSlideStart(e) {
    this.setState({
      initialX: getCoordinates(e).x,
      mouseDown: true
    });
  }

  onSlideMove(e) {
    const current = getCoordinates(e);
    if(e.type === "touchmove" || this.state.mouseDown) {
      this.setPoints(current.x);
    }
  }

  setPoints(x) {
    const diff = this.state.initialX - x;
    let points = Math.pow(10, Math.round(diff * 0.04));
    points = Math.max(1, points);
    points = Math.min(1000000, points);
    if(this.props.onChange) {
      this.props.onChange(points);
    }
  }

  onSlideEnd(e) {
    e.preventDefault();
    this.setState({
        initialX: null,
        mouseDown: false
    });
  }

  render() {
    const sliderStyle = {
      minWidth: "13ch",
      textAlign: "right",
      fontSize: "3em"
    }
    return (
      <div>
        <Header textAlign="right" size="small">Drag below to increase</Header>
        <Label className="unselectable" style={sliderStyle}
            onTouchStart={this.onSlideStart} 
            onTouchMove={this.onSlideMove}
            onTouchEnd={this.onSlideEnd} 
            onTouchCancel={this.onSlideEnd}
            onMouseDown={this.onSlideStart}
            onMouseMove={this.onSlideMove}
            onMouseUp={this.onSlideEnd}
            onMouseLeave={this.onSlideEnd}>
          <Icon name="left arrow" color="blue" />
          {this.props.points}
        </Label>
      </div>
    );
  }
}

function getCoordinates(event) {
  let x, y;
  switch(event.type) {
    case "mousedown":
    case "mousemove":
    case "mouseleave":
      x = event.clientX;
      y = event.clientY;
      break;
    case "touchstart":
    case "touchmove":
    case "touchend":
    case "touchcancel":
      let touch = event.changedTouches[0];
      x = touch.clientX;
      y = touch.clientY;
      break;
    default:
      throw TypeError("event type " + event.type + " not supported");
  }
  return {
    x: x,
    y: y
  };
}
