function isString (x) {
  var type = Object.prototype.toString.apply(x);
  return type.slice(type.indexOf(' ') + 1, -1) === 'String' && isNaN(Number(x));
}

function isObject (obj) {
  return obj === Object(obj) && !Array.isArray(obj);
}


module.exports = isJSON;

function isJSON (str, pass_object) {
  if (pass_object && isObject(str)) return true;

  if (!isString(str)) return false;

  if (/^\{(.*?)\}$/.test(str))
    return /"(.*?)":(.*?)/g.test(str);

  if (/\[(.*?)\]/.test(str)) {
    str = str.replace(/\s/g, '')
              .replace(/^\[/, '')
              .replace(/\]$/, '')
              .replace(/},{/g, '}\n{')
              .split(/\n/);
              console.log(str);
    return str.map(function (s) { return isJSON(s); })
              .reduce(function (prev, curr) { return !!curr; });
  }

  return false;
}
