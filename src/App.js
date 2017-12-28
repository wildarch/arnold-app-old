import './App.css';
import React, { Component } from 'react';
import Login from './login/Login';
import LeaderBoard from './leaderboard/LeaderBoard';
import AddPoints from './add-points/AddPoints';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userId: localStorage.getItem("userId"),
      arnold: null
    };
    this.onUserId = this.onUserId.bind(this);
    this.onSelectArnold = this.onSelectArnold.bind(this);
    this.onAddPoints = this.onAddPoints.bind(this);
  }

  componentWillMount() {
    const usersRef = firebase.database().ref().child('arnoldApp').child('users');
    const pointsRef = firebase.database().ref().child('arnoldApp').child('points');
    this.setState({usersRef: usersRef});
    this.setState({pointsRef: pointsRef});

    console.log(this.state);
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

  onSelectArnold(id) {
    this.setState({arnold: id});
  }

  onAddPoints(points, desc) {
    // Change line below to update firebase
    console.log(`Add ${points} to ${this.state.users[this.state.arnold].name} (by ${this.state.users[this.state.userId].name}). Description: ${desc}`);
    const newTransactionRef = this.state.pointsRef.push();
    newTransactionRef.set({
      amount: points,
      from: this.state.userId,
      to: this.state.arnold,
      time: Date.now()
    });

    this.state.usersRef.transaction(users => {
      if(users) {
        users[this.state.arnold].points += points;
      }
      return users;
    });

    this.setState({arnold: null});
  }

  render() {
    if(this.state.userId == null) {
      return (
        <Login users={this.state.users} onUserId={this.onUserId} userId={this.state.userId} />
      );
    }
    else if(this.state.arnold === null) {
      return <LeaderBoard users={this.state.users} userId={this.state.userId} onSelectArnold={this.onSelectArnold} />
    }
    else {
      return <AddPoints victim={this.state.users[this.state.arnold]} onAddPoints={this.onAddPoints} />
    }
  }
}

export default App;
