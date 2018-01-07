import React, { Component } from 'react';
import Login from './login/Login';
import LeaderBoard from './leaderboard/LeaderBoard';
import AddPoints from './add-points/AddPoints';
import History, { RemoveError  } from './history/History';
import * as firebase from 'firebase';
import { Menu, Icon } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';

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
    this.onAddPoints = this.onAddPoints.bind(this);
    this.onRemovePoints = this.onRemovePoints.bind(this);
    this.onRecoverPoints = this.onRecoverPoints.bind(this);

    this.routes = [
      { path: '/login',
        hideInSidebar: true,
        content: () => (<Login 
            users={this.state.users} 
            onUserId={this.onUserId} 
            userId={this.state.userId} 
          />)
      },
      { path: '/',
        exact: true,
        name: "Leaderboard",
        icon: "browser",
        content: () => (<LeaderBoard 
            users={this.state.users} 
            userId={this.state.userId} 
          />)
      },
      { path: '/history',
        name: "History",
        icon: "calendar",
        content: ({ location }) => (<History 
            users={this.state.users} 
            points={this.state.points} 
            onRemove={this.onRemovePoints} 
            onRecover={this.onRecoverPoints} 
            location={location}
          />)
      },
      { path: '/add-points/:to',
        hideInSidebar: true,
        content: ({ match }) => (<AddPoints 
            victim={this.state.users[parseInt(match.params.to, 10)]}
            onAddPoints={(points, desc) => this.onAddPoints(points, desc, parseInt(match.params.to, 10))}
          />)
      }
    ];
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

  onAddPoints(points, description, arnold) {
    this.addPoints(points, this.state.userId, arnold, description);
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

    let userName = null;
    if (this.state.userId !== null && this.state.userId < this.state.users.length) {
      userName = this.state.users[this.state.userId].name;
    }

    return (
      <Router>
        <div>
          <Route render={props => {
            if(this.state.userId === null && props.location.pathname !== '/login') {
              console.log(props);
              return <Redirect to='/login' />
            }
            else {
              return "";
            }
          }} />
          {userName && (
            <Menu fixed='top' inverted>
              {this.routes.filter(r => !r.hideInSidebar).map((route, index) => (
                <NavLink exact to={route.path} key={index} className='item' activeClassName='active'>
                  <Icon name={route.icon} /> {route.name}
                </NavLink>
              ))}
              <Menu.Item position='right' onClick={(e) => this.onUserId(null)}>
                <Icon name='sign out' /> Sign out {userName}
              </Menu.Item>
            </Menu>
          )}
          <div style={spacerStyle}/>
          {this.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.content}
            />
          ))}
        </div>
      </Router>
    )
  }
}

export default App;
