export default function toArray(map){
  var res = [];
  for (var key in map) {
    // skip loop if the property is from prototype
    if (!map.hasOwnProperty(key)) continue;

    var obj = map[key];
    obj.key = key;
    res.push(obj);
}
return res;
}
