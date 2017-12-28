import React, { Component } from 'react';
import { Grid, Image, Card, Button, Input } from 'semantic-ui-react';
import Slider from '../slider/Slider';

export default class AddPoints extends Component {
  constructor(props) {
    super(props);
    this.onSetPoints = this.onSetPoints.bind(this);
    this.state = {
      points: 1,
      description: ""
    };
  }

  onSetPoints(points) {
    this.setState({points: points});
  }

  render() {
    return (
      <Grid container>
        <Grid.Row centered>
          <Card>
            <Image src={"/images/" + this.props.victim.image} />
            <Card.Content>
              <Card.Header>
                {this.props.victim.name}
              </Card.Header>
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Slider onChange={this.onSetPoints} points={this.state.points} />
        </Grid.Row>
        <Grid.Row>
          <Input placeholder="Description" size="large" 
            onChange={(e) => this.setState({description: e.target.value})}/>
        </Grid.Row>
        <Grid.Row centered>
          <Button icon="plus" size="massive" content="Add points"
            disabled={this.state.description.length === 0}
            onClick={(e) => this.props.onAddPoints(this.state.points, this.state.description)} />
        </Grid.Row>
      </Grid>
    )
  }
}
