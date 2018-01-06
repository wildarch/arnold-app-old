import React, { Component } from 'react';
import { Header, Grid, Button, Image, List, Container } from 'semantic-ui-react';

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
                <Grid verticalAlign='middle' centered>
                  <Grid.Column width={4}>
                    <Image size='small' avatar src={"/images/" + user.image} />
                  </Grid.Column>
                  <Grid.Column stretched width={8}>
                    <Header size='tiny'>
                      {user.name}
                    </Header>
                    {user.points} {(user.points === 1) ? 'point' : 'points'}
                  </Grid.Column>
                  <Grid.Column verticalAlign='middle' width={4}>
                    <Button primary icon='plus' />
                  </Grid.Column>
                </Grid>
              </List.Item>
            ))
          }
        </List>
      </Container>
    );
  }
}
