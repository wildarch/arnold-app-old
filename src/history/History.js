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
      error: null,
      errorTimer: null
    };

  }

  onRemove(key) {
    const err = this.props.onRemove(key);
    if(err) {
      if(this.state.errorTimer !== null) {
        clearTimeout(this.state.errorTimer);
      }
      this.setState({
          error: err.message,
          errorTimer: setTimeout(() => this.setState({error: null}), 3000)
      });
    }
  }

  onRecover(key) {
    this.props.onRecover(key);
  }

  render() {
    const params = new URLSearchParams(this.props.location.search);
    let to = params.get('to');
    if(to !== null) {
      to = parseInt(to, 10);
    }
    let from = params.get('from');
    if(from !== null) {
      from = parseInt(from, 10);
    }
    let deleted;
    switch(params.get('deleted')) {
      case "true":
        deleted = true;
        break;
      case "false":
        deleted = false;
        break;
      default:
        deleted = null;
    }
    console.log(to, from, deleted);
    return (
      <Container>
      <List divided verticalAlign='middle' size="big">
        {[...toArray(this.props.points)]
          .sort((a, b) => b.time - a.time)
          .filter(element => 
            (to === null || element.to === to) &&
            (from === null || parseInt(element.from, 10) === from) &&
            (deleted === null || element.deleted === deleted || (element.deleted === undefined && !deleted))
          )
          .map(element => {
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
                    <div style={{
                        position: 'fixed', 
                        textAlign: 'center', 
                        top: '10%', 
                        left: 0, 
                        right: 0, 
                        height: 0
                    }}>
                      <Message compact negative
                          header='Could not remove event'
                          content={this.state.error}
                      />
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
