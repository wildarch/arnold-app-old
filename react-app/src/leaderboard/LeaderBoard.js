import React, { Component } from 'react';
import { Grid, Card, Button, Image, Loader, List, Container, Segment,Sidebar,Menu, Icon, Header } from 'semantic-ui-react';

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
      <div>

      <Sidebar.Pushable as={Segment}>
          <Menu direction='top'  inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Menu>
          <Sidebar.Pusher>
            <Segment basic>
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
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>

    );
    return (row)
  }
}
