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
var userId = 0;
var localList = {"text": []};
//Select the DOM (HTML) elements
var todoListDom = document.querySelector("#userList");

var textDom = document.querySelector("#text");

/*

*/
//
var dbRef = firebase.database().ref().child('arnoldApp').child('users');

//var dbRef2 = firebase.database().ref().child('arnoldApp').child('points');
var ref = firebase.database().ref().child("arnoldApp").child("points");

function drawElement(element,id){
  //This will add a new item to the #todoList
  todoListDom.innerHTML += `
  <div class="item">
    <div class="right floated content">
      <div class="ui button" onclick="addElement(100,`+id+`)">+</div>
    </div>
    <img class="ui avatar image" src="images/` + element.image + `">
    <div class="content">
      <a class="header">` + element.name + `</a>
      <div class="description"> (`+element.points+`) Got `+ 100 +` arnold punten from `+ "Fristy"+` </div>
    </div>
  </div>`;
  //<div class=\"todoListElement\" id=\"num "+id+"\">"+element.name+"</div>";
}
function drawList(list){
  //This will draw all the elements in the list
  todoListDom.innerHTML = "";
  //forEach will loop through all the elements in the array and append execute drawElement(element,index) on them
  list.forEach(drawElement);
}
//When the 'text' value changes in firebase
dbRef.on('value',function (x){
                              localList = x.val();
                              drawList(localList);
                             });
function addElement(amount,otherId){
  ref.push({
    "from": userId,
    "to": otherId,
    "amount": amount,
    "time": Math.floor(Date.now() / 1000)
  })
  localList[otherId].points += 100;
  //localList.push({"points":inputName});
  //empty the text element
  //textDom.value = "";
  drawList(localList);
  dbRef.set(localList);
}
