import React, { Component } from 'react';
import { Image, Grid, Card, Header } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.selectUser = this.selectUser.bind(this);
  }

  selectUser(id) {
    this.props.onUserId(id);
  }

  render() {
    if(this.props.userId) {
      return <Redirect to='/' />
    }
    return (
      <Grid centered container>
        <Grid.Row centered>
          <Header textAlign="center" size="huge" content="Bonjour, chinois?" subheader="Who are you?" />
          <Card.Group>
            {this.props.users.map((user, index) => (
              <Card key={index} centered as='div'>
                <Link to='/' key={index} onClick={(e) => this.selectUser(index)}>
                  <Image src={"/images/" + user.image} />
                </Link>
                <Card.Content>
                  <Card.Header>{user.name}</Card.Header>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Row>
      </Grid>
    );
  }
}
