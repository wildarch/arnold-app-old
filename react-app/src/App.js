import './App.css';
import React, { Component } from 'react';
import Login from './login/Login';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentWillMount() {
    const usersRef = firebase.database().ref().child('arnoldApp').child('users');
    usersRef.on('value', ref => {
      const newState = this.state;
      newState.users = ref.val();
      this.setState(newState);
    }).bind(this);

  }
  render() {
    return (
      <Login users={this.state.users} />
    );
  }
}

export default App;
