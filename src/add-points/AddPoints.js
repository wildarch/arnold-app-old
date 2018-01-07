import React, { Component } from 'react';
import { Icon, Grid, Image, Card, Button, Form, Header, TextArea, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
    if(!this.props.victim) {
      return (
        <Grid container>
          <Grid.Row>
            <Loader active inline='centered' content='Loading' />
          </Grid.Row>
        </Grid>
      );
    }
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
          <Button size="massive"
              disabled={this.state.description.length === 0}
              onClick={(e) => this.props.onAddPoints(this.state.points, this.state.description)}>
            <Link to='/'>
              <Icon name='plus' /> Add points
            </Link>
          </Button>
        </Grid.Row>
      </Grid>
    )
  }
}
