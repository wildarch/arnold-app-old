import './App.css';
import React, { Component } from 'react';
import Login from './login/Login';
import LeaderBoard from './leaderboard/LeaderBoard';
import AddPoints from './add-points/AddPoints';
import * as firebase from 'firebase';
import { Menu, Icon } from 'semantic-ui-react';

// The one and only Arnold is the Walfrips
const TRUE_ARNOLD_INDEX = 0;

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

    this.onUserId(localStorage.getItem('userId'));
  }

  onUserId(id) {
    this.setState({userId: id});
    if(id !== null) {
      localStorage.setItem("userId", id);
    }
    else {
      localStorage.removeItem("userId");
    }
    console.log(id);
  }

  onSelectArnold(id) {
    this.setState({arnold: id});
  }

  addPoints(points, from, to, description) {
    const newTransactionRef = this.state.pointsRef.push();
    newTransactionRef.set({
      amount: points,
      from: from,
      to: to,
      time: Date.now(),
      description: description
    });

    let trueArnoldBonusPoints = 0;

    this.state.usersRef.transaction(users => {
      if(users) {
        users[to].points += points;

        if(to !== TRUE_ARNOLD_INDEX) {
          const arnoldPoints = users[to].points;
          const trueArnoldPoints = users[TRUE_ARNOLD_INDEX].points;
          trueArnoldBonusPoints = Math.max(0, arnoldPoints - trueArnoldPoints + 1);
        }
      }
      return users;
    });

    if(trueArnoldBonusPoints > 0) {
      this.applyTrueArnoldCorrection(trueArnoldBonusPoints);
    }
  }

  onAddPoints(points, description) {
    this.addPoints(points, this.state.userId, this.state.arnold, description);
    this.setState({arnold: null});
  }

  applyTrueArnoldCorrection(points) {
    this.addPoints(points, TRUE_ARNOLD_INDEX, TRUE_ARNOLD_INDEX, "Because he is the Arnold");
  }

  render() {
    const spacerStyle = {
      marginBottom: "50px"
    };
    if(this.state.userId == null) {
      return (
        <Login users={this.state.users} onUserId={this.onUserId} userId={this.state.userId} />
      );
    }
    else if(this.state.arnold === null) {
      let userName;
      if(this.state.users.length > this.state.userId) {
        userName = this.state.users[this.state.userId].name;
      }
      else {
        userName = "Unknown user";
      }
      return (
          <div>
            <Menu fixed="top" inverted>
              <Menu.Item active>
                <Icon name="browser" /> Leaderboard
              </Menu.Item>
              <Menu.Item position="right" onClick={(e) => this.onUserId(null)}>
                <Icon name="sign out"/> Sign out {userName}
              </Menu.Item>
            </Menu>
            <div style={spacerStyle}/>
            <LeaderBoard users={this.state.users} userId={this.state.userId} onSelectArnold={this.onSelectArnold} />
          </div>
      )
    }
    else {
      return (
        <div>
          <Menu fixed="top" inverted>
            <Menu.Item onClick={(e) => this.onSelectArnold(null)}>
              <Icon name="arrow left" /> Leaderboard
            </Menu.Item>
            <Menu.Item active>
              <Icon name="plus" /> Add Arnold punten
            </Menu.Item>
          </Menu>
          <div style={spacerStyle}/>
          <AddPoints victim={this.state.users[this.state.arnold]} onAddPoints={this.onAddPoints} />
        </div>
      )
    }
  }
}

export default App;
