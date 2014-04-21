
function isString (x) {
  var type = Object.prototype.toString.apply(x);
  return type.slice(type.indexOf(' ') + 1, -1) === 'String' && isNaN(Number(x));
}


module.exports = isJson;

function isJson (str) {
  if (!isString(str)) return false;

  return /^[\],:{}\s]*$/
    .test(str
      .replace(/""/, '"""')
      .replace(/\\["\\\/bfnrtu]/g, '@')
      .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
      .replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
}