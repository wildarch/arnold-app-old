import React, { Component } from 'react';
import { List, Container } from 'semantic-ui-react';
import timeSince from './timeSince';
import toArray from './toArray';

export default class LeaderBoard extends Component {
  render() {
    return (
      <Container>
      <List divided verticalAlign='middle' size="big">
        {[...toArray(this.props.points)].sort((a, b) => a.time - b.time).map((element, index) => (
          <List.Item key={index}>
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
    )
  }
}
