import React, { Component } from 'react';
import { Button, Image, List, Container } from 'semantic-ui-react';

export default class LeaderBoard extends Component {
  render() {
    return (
      <Container>
        <List divided verticalAlign='middle' size="big">
          {[...this.props.users]
            .map((user, index) => {user.index = index; return user;})
            .sort((a, b) => b.points - a.points)
            .map(user => (
              <List.Item key={user.index} onClick={(e) => this.props.onSelectArnold(user.index)}>
               <List.Content floated='right' verticalAlign="middle">
                 <Button icon="add" content="points" />
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
            ))
          }
        </List>
      </Container>
    );
  }
}
