import React, { Component } from 'react';
import { Grid, Card, Button, Image, Loader } from 'semantic-ui-react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.selectUser = this.selectUser.bind(this);
  }

  selectUser(id) {
    this.props.onUserId(id);
  }

  render() {
    let row;
    if(this.props.userId !== null) {
      console.log(this.props.userId);
      let user = this.props.users[this.props.userId];
      if(!user) {
        return <Loader inline="centered">Loading..</Loader>;
      }
      row = (
        <Grid.Row centered>
          <Card>
            <Image src={"/images/" + user.image} />
            <Card.Content>
              <Card.Header>
                {user.name}
              </Card.Header>
            </Card.Content>
            <Button atttached="bottom" icon="sign out" content="Sign out" onClick={(e) => this.selectUser(null)} />
          </Card>
        </Grid.Row>
      );
    }
    else {
      row = (
        <Card.Group>
          {this.props.users.map((user, index) => (
            <Card
              header={user.name}
              image={"/images/" + user.image}
              onClick={(e) => this.selectUser(index)} />
          ))}
        </Card.Group>
      );
    }
    return (
      <Grid container>
        {row}
      </Grid>
    )
  }
}
