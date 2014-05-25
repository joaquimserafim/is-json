
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

  // https://github.com/douglascrockford/JSON-js/blob/master/json2.js#L451
  return /^[\],:{}\s]*$/
    .test(str
      .replace(/\\["\\\/bfnrtu]/g, '@')
      .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
      .replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
}
