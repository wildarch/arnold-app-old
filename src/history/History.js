import React, { Component } from 'react';
import { Message, List, Container, Button, TransitionablePortal } from 'semantic-ui-react';
import timeSince from './timeSince';
import toArray from './toArray';

export default class History extends Component {
  constructor() {
    super();
    this.onRemove = this.onRemove.bind(this);
    this.onRecover = this.onRecover.bind(this);
    this.state = {
      error: null
    };

  }

  onRemove(key) {
    const err = this.props.onRemove(key);
    if(err) {
      this.setState({error: err.message});
      setTimeout(() => this.setState({error: null}), 3000);
    }
  }

  onRecover(key) {
    this.props.onRecover(key);
  }

  render() {
    return (
      <Container>
      <List divided verticalAlign='middle' size="big">
        {[...toArray(this.props.points)].sort((a, b) => b.time - a.time).map((element, index) => {
          const isDeleted = element.hasOwnProperty('deleted') && element.deleted;
          const textStyle = isDeleted ? {textDecoration: 'line-through'} : {};
          return (
            <List.Item key={element.key}>
               <List.Content floated='right'>
                <Button 
                  negative={!isDeleted} 
                  basic 
                  icon={isDeleted ? 'history' : 'trash'} 
                  onClick={isDeleted ? (e) => this.onRecover(element.key) : (e) => this.onRemove(element.key)} 
                />
                <TransitionablePortal 
                  onClose={() => this.setState({error: null})}
                  open={this.state.error !== null}
                >
                  <div style={{position: 'fixed', textAlign: 'center', top: '10%', left: 0, right: 0, height: 0}}>
                    <Message compact negative>
                      <Message.Header>Could not remove event</Message.Header>
                      <p>{this.state.error}</p>
                    </Message>
                  </div>
                </TransitionablePortal>
               </List.Content>
               
               <List.Content style={textStyle}>
                 <List.Header>
                   {element.description}
                 </List.Header>
                 <List.Description>
                   {this.props.users[element.from].name} gave {element.amount} Arnold punten to {this.props.users[element.to].name} {timeSince(element.time)} ago
                 </List.Description>
               </List.Content>

            </List.Item>
          );
        })}
      </List>
      </Container>
    )
  }
}

export class RemoveError extends Error {}
