var test = require('assert');

var isJson = require('../');


console.log('Running tests...');

[
  null,
  false,
  '',
  'normal string',
  12121212,
  1212.12,
  [1,2,3],
  '{"a":"obja""b":[0,1,2],"c":{"d":"some object"}}',// bad json
  {a: 12, b: [1,2,3]},// json object
  '{"a":"obja","b":[0,1,2],"c":{"d":"some object"}}'// this will pass
].forEach(function (ele, i) {
  test.equal(isJson(ele), i < 9 ? false : true, 'Only the last element is a valid JSON string');
});

console.log('finish.');