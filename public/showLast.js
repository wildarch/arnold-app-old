function showLast(){
  pointsRef.limitToLast(20).once('value',function (x){
    console.log("list", x.val());
    var list = x.val()
    var array = toArray(list)
    console.log(array);
    drawList(array,drawEvent);

  });
}
function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
function drawEvent(element,id){
  userListDom.innerHTML += `
  <div class="item">
    <div class="right floated content">
      <div class="ui button" onclick="addElement(100,`+id+`)">-</div>
    </div>
    <img class="ui avatar image" src="images/` + localList[element.to].image + `">
    <div class="content">
      <a class="header">` + element.description + `</a>
      <div class="description"> (`+localList[element.from].name+`) gave  `+ element.amount +` arnold punten to `+ localList[element.to].name+` `+timeSince(element.time*1000)+` ago</div>
    </div>
  </div>`;
}
function toArray(map){
  var res = [];
  for (var key in map) {
    // skip loop if the property is from prototype
    if (!map.hasOwnProperty(key)) continue;

    var obj = map[key];
    res.push(obj);
    for (var prop in obj) {
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) continue;

        // your code
        console.log(prop + " = " + obj[prop]);
    }

}
return res;
}
