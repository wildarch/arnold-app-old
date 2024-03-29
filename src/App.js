import React, { Component } from 'react';
import Login from './login/Login';
import LeaderBoard from './leaderboard/LeaderBoard';
import AddPoints from './add-points/AddPoints';
import History, { RemoveError  } from './history/History';
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
      arnold: null,
      showHistory: false
    };
    this.onUserId = this.onUserId.bind(this);
    this.onSelectArnold = this.onSelectArnold.bind(this);
    this.onAddPoints = this.onAddPoints.bind(this);
    this.onRemovePoints = this.onRemovePoints.bind(this);
    this.onRecoverPoints = this.onRecoverPoints.bind(this);
  }

  componentWillMount() {
    const usersRef = firebase.database().ref().child('arnoldApp').child('users');
    const pointsRef = firebase.database().ref().child('arnoldApp').child('points');
    this.setState({usersRef: usersRef});
    this.setState({pointsRef: pointsRef});

    usersRef.on('value', ref => {
      this.setState({users: ref.val()});
    }).bind(this);

    pointsRef.on('value', ref => {
      this.setState({points: ref.val()});
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
    this.resetScroll();
  }

  onSelectArnold(id) {
    this.setState({arnold: id});
    this.resetScroll();
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

  onTogglePoints(key) {
    const point = this.state.points[key];
    const amount = point.amount;
    const receiver = point.to;
    const wasDeleted = point.hasOwnProperty('deleted') && point.deleted;
    if(receiver === TRUE_ARNOLD_INDEX) {
      return new RemoveError("The true Arnold always deserves points given to him");
    }
    this.state.pointsRef.child(key).transaction(point => {
      if(point !== null) {
        point.deleted = !wasDeleted;
        return point;
      }
    });
    this.state.usersRef.transaction(users => {
      users[receiver].points += wasDeleted ? amount : -amount;
      return users;
    });
  }

  onRemovePoints(key) {
    return this.onTogglePoints(key);
  }

  onRecoverPoints(key) {
    this.onTogglePoints(key);
  }

  applyTrueArnoldCorrection(points) {
    this.addPoints(points, TRUE_ARNOLD_INDEX, TRUE_ARNOLD_INDEX, "Because he is the Arnold");
  }

  resetScroll() {
    window.scrollTo(0, 0);
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
    else if(this.state.showHistory) {
      return (
        <div>
          <Menu fixed="top" inverted>
            <Menu.Item onClick={(e) => {this.setState({showHistory: false}); this.resetScroll();}}>
              <Icon name="arrow left" /> Leaderboard
            </Menu.Item>
            <Menu.Item active>
              <Icon name="calendar" /> History
            </Menu.Item>
          </Menu>
          <div style={spacerStyle}/>
          <History users={this.state.users} points={this.state.points} onRemove={this.onRemovePoints} onRecover={this.onRecoverPoints} />
        </div>
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
              <Menu.Item onClick={(e) => {this.setState({showHistory: true}); this.resetScroll();}}>
                <Icon name="calendar" /> History
              </Menu.Item>
              <Menu.Item position="right" onClick={(e) => {this.onUserId(null); this.resetScroll();}}>
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
            <Menu.Item onClick={(e) => {this.onSelectArnold(null); this.resetScroll();}}>
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
