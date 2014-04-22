
function isString (x) {
  var type = Object.prototype.toString.apply(x);
  return type.slice(type.indexOf(' ') + 1, -1) === 'String' && isNaN(Number(x));
}

function isObject (obj) {
  return obj === Object(obj) && !Array.isArray(obj);
}


module.exports = isJson;

function isJson (str, pass_objects) {

  if (pass_objects && isObject(str)) return true;

  if (!isString(str)) return false;

  return /^[\],:{}\s]*$/
    .test(str
      .replace(/""/, '"""')
      .replace(/\\["\\\/bfnrtu]/g, '@')
      .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
      .replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
}