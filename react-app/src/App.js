import './App.css';
import React, { Component } from 'react';
import Login from './login/Login';
import AddPoints from './add-points/AddPoints';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userId: localStorage.getItem("userId")
    };
    this.onUserId = this.onUserId.bind(this);
    this.onAddPoints = this.onAddPoints.bind(this);
  }

  componentWillMount() {
    const usersRef = firebase.database().ref().child('arnoldApp').child('users');
    usersRef.on('value', ref => {
      const newState = this.state;
      newState.users = ref.val();
      this.setState(newState);
    }).bind(this);
  }

  onUserId(id) {
    this.setState({userId: id});
    if(id !== null) {
      localStorage.setItem("userId", id);
    }
    else {
      localStorage.removeItem("userId");
    }

    console.log(this.state.userId);
  }

  onAddPoints(points) {
    console.log("points: " + points);
  }

  render() {
    if(this.state.userId == null) {
      return (
        <Login users={this.state.users} onUserId={this.onUserId} userId={this.state.userId} />
      );
    }
    else {
      return <AddPoints victim={{name: "Daan", image: "daan.jpg"}} onAddPoints={this.onAddPoints} />
    }
  }
}

export default App;
