import React, { Component } from 'react';
import { Button, Image, List, Container } from 'semantic-ui-react';

export default class LeaderBoard extends Component {
  render() {
    return (
      <Container>
      <List divided verticalAlign='middle' size="big">
        {this.props.users.map((user, index) => (
          <List.Item >
             <List.Content floated='right'>
             <Button icon="add" onClick={(e) => this.props.onSelectArnold(index)} />
             </List.Content>
             <Image avatar size="tiny" src={"/images/" + user.image} />
             <List.Content>
             <List.Header>
              {user.name}
             </List.Header>
             <List.Description>
             ({user.points})
             </List.Description>
             </List.Content>
          </List.Item>
        ))}
      </List>
      </Container>
    );
  }
}
