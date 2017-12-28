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

const userDom = document.getElementsByClassName("user")[0];
const usersDom = document.getElementsByClassName('users')[0];
const userNameDom = userDom.getElementsByClassName("name")[0];
const userImageDom = userDom.getElementsByTagName('img')[0];

function setUser(id) {
  if(id !== null) {
    userId = id;
    localStorage.setItem("userId", userId);
    const user = users[id];
    userNameDom.innerText = user.name;
    userImageDom.setAttribute("src", "/images/" + user.image);
    usersDom.style["display"] = "none";
    userDom.style["display"] = "";
  }
  else {
    localStorage.removeItem("userId");
    userDom.style["display"] = "none";
    usersDom.style["display"] = "";
  }
}

let userId = localStorage.getItem("userId");

let users;
function setUsers(usrs) {
  users = usrs;
  usersDom.innerHTML = "";
  for(let i = 0; i < users.length; i++) {
    usersDom.innerHTML += drawUser(i, users[i]);
  }
  setUser(userId);
}


function drawUser(id, user) {
  return `<div class="ui card" onclick=setUser(` + id + `)>
    <div class="image">
      <img src="/images/` + user.image + `">
    </div>
    <div class="content">
      <a class="header">` + user.name + `</a>
    </div>
  </div>`;
}
