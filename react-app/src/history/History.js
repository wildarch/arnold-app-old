import React, { Component } from 'react';
import { Grid, Card, Button, Image, Loader, List, Container } from 'semantic-ui-react';
import timeSince from './timeSince';
import toArray from './toArray';

export default class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.addPoints = this.addPoints.bind(this);
  }
  addPoints(id) {
    alert(id);
    //timeSince(1);
  }
  render() {

    //let user = this.props.users;
    let row = (
      <Container>
      <List divided verticalAlign='middle' size="big">
        {toArray(this.props.points).map((element, index) => (
          <List.Item >
             <List.Content floated='right'>
             </List.Content>
             <List.Content>
             <List.Header>
              {element.description}
             </List.Header>
             <List.Description>
             {this.props.users[element.from].name} gave {element.amount} Arnold punten to {this.props.users[element.to].name} {timeSince(element.time)} ago
</List.Description>
             </List.Content>

          </List.Item>
        ))}
      </List>
      </Container>
    );
    return (row)

  }
}
