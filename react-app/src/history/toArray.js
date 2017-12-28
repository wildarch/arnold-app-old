export default function toArray(map){
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
