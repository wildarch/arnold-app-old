import React, { Component } from 'react';
import { Grid, Image, Card, Button, Form, Header, TextArea } from 'semantic-ui-react';
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
        <Grid.Row centered>
          <Slider onChange={this.onSetPoints} points={this.state.points} />
        </Grid.Row>
        <Grid.Row columns="sixteen" centered>
          <Form>
            <Header>Description</Header>
            <TextArea rows="1" placeholder='Slept on a dixi' onChange={(e) => this.setState({description: e.target.value})}/>
          </Form>
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
