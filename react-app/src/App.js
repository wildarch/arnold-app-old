import './App.css';
import React, { Component } from 'react';
import History from './history/History'
import Login from './login/Login';
import LeaderBoard from './leaderboard/LeaderBoard';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      points: {},
      userId: localStorage.getItem("userId")
    };
    this.onUserId = this.onUserId.bind(this);
  }
  componentWillMount() {
    const usersRef = firebase.database().ref().child('arnoldApp').child('users');
    const pointsRef = firebase.database().ref().child('arnoldApp').child('points').limitToLast(20);
    usersRef.on('value', ref => {
      const newState = this.state;
      newState.users = ref.val();
      this.setState(newState);
    }).bind(this);

    pointsRef.on('value', ref => {
      const newState = this.state;
      newState.points = ref.val();
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

  render() {
    if(this.state.userId == null) {
      return (
        <Login users={this.state.users} onUserId={this.onUserId} userId={this.state.userId} />
      );
    }
    else {
      //return <History points={this.state.points} users={this.state.users} userId={this.state.userId} />
      return <LeaderBoard users={this.state.users} userId={this.state.userId} />
    }
  }
}



export default App;
