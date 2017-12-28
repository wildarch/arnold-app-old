function sendPoints(pointsRef, usersRef,amount,otherId,description){
  pointsRef.push({
    "from": userId,
    "to": otherId,
    "amount": amount,
    "time": Date.now(),
    "description": description
  })
  this.
  localList[otherId].points += 100;
  //localList.push({"points":inputName});
  //empty the text element
  //textDom.value = "";
  //drawList(localList);
  dbRef.child(otherId).child(points).set(localList);
}
