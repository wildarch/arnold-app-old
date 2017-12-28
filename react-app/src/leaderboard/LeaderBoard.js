import React, { Component } from 'react';
import { Grid, Card, Button, Image, Loader, List, Container } from 'semantic-ui-react';

export default class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.addPoints = this.addPoints.bind(this);
  }
  addPoints(id) {
    alert(id);
  }
  render() {
    //let user = this.props.users;
    let row = (
      <Container>
      <List divided verticalAlign='middle' size="big">
        {this.props.users.map((user, index) => (
          <List.Item >
             <List.Content floated='right'>
             <Button icon="add"onClick={(e) => this.addPoints(index)}></Button>
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
    return (row)
  }
}
