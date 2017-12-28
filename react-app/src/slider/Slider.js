import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import './slider.css';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  onTouchStart(e) {
    this.setState({initialPosition: getTouchCoordinates(e)});
  }

  onTouchMove(e) {
    const current = getTouchCoordinates(e);
    const diff = this.state.initialPosition.x - current.x;
    let points = Math.pow(10, Math.round(diff * 0.04));
    points = Math.max(1, points);
    points = Math.min(1000000, points);
    if(this.props.onChange) {
      this.props.onChange(points);
    }
  }

  onTouchEnd(e) {
    this.setState({initialPosition: null});
  }

  render() {
    const sliderStyle = {
      width: "90vw",
      textAlign: "right",
      fontSize: "3em"
    }
    return (<Label className="slider" content={this.props.points} style={sliderStyle}
    onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}
    onTouchEnd={this.onTouchEnd} onTouchCancel={this.onTouchEnd}/>);
  }
}

function getTouchCoordinates(event) {
  let touch = event.changedTouches[0];
  return {
    x: touch.clientX,
    y: touch.clientY
  };
}
