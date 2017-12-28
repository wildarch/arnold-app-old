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
var localList = {"text": []};
//Select the DOM (HTML) elements
var todoListDom = document.querySelector("#userList");
var buttonDom = document.querySelector("#addButton");
var textDom = document.querySelector("#text");

/*
This is the structure of the datebase:
{
  "text" : [ {
    "value" : "eat a pinda"
  }, {
    "value" : "groceries"
  }, {
    "value" : "test"
  }, {
    "value" : "someting"
  }, {
    "value" : "test"
  } ]
}

So localList will contain everything inside the 'text' child

localList[0].value will contain "eat a pinda"
*/
//This is the reference to the text element on the TODO list
var dbRef = firebase.database().ref().child('arnoldApp').child('users');

function drawElement(element,id){
  //This will add a new item to the #todoList
  todoListDom.innerHTML += `
  <div class="item">
    <div class="right floated content">
      <div class="ui button">+</div>
    </div>
    <img class="ui avatar image" src="/images/avatar2/small/lena.png">
    <div class="content">
      <a class="header">` + element.name + `</a>
      <div class="description">Got `+ 100 +` arnold punten from `+ "Fristy"+` </div>
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
function addElement(inputName){
  localList.push({"value":inputName});
  //empty the text element
  textDom.value = "";
  drawList(localList);
  dbRef.set(localList);
}
//buttonDom.addEventListener("click", function (){addElement(textDom.value);});
