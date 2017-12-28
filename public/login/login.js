// Initialize Firebase
//Please change this to your own information (when logging in on firebase.google.com)
var config = {
  apiKey: "AIzaSyCPzEuR-tNHrEuAXfM-nPFXPl-cOVv9x0U",
  authDomain: "arnoldapp-beb09.firebaseapp.com",
  databaseURL: "https://arnoldapp-beb09.firebaseio.com",
  projectId: "arnoldapp-beb09",
  storageBucket: "arnoldapp-beb09.appspot.com",
  messagingSenderId: "360543261866"
};
firebase.initializeApp(config);

const usersRef = firebase.database().ref().child('arnoldApp').child('users');
usersRef.on('value', ref => setUsers(ref.val()));


const usersDom = document.getElementsByClassName('users')[0];

function setUsers(users) {
  usersDom.innerHTML = "";
  for(let i = 0; i < users.length; i++) {
    usersDom.innerHTML += drawUser(i, users[i]);
  }
}

function setUser(id) {
  console.log("Your user is: " + id);
}

function drawUser(id, user) {
  return `<div class="ui card">
    <div class="image">
      <img src="/images/` + user.image + `">
    </div>
    <div class="content">
      <a class="header" onclick=setUser(` + id + `)>` + user.name + `</a>
    </div>
  </div>`;
}
