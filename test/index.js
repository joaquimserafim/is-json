var test = require('tape');
var isJSON = require('../');


test('performe isJSON verifications', function (t) {
  t.plan(16);

  t.deepEqual(isJSON(null), false, '`null`, should return false');
  t.deepEqual(isJSON(false), false, '`false`, should return false');
  t.deepEqual(isJSON(''), false, '`\'\'`, should return false');
  t.deepEqual(isJSON('normal string'), false, '\'normal string\', should return false');
  t.deepEqual(isJSON(2014), false, '`2014`, should return false');
  t.deepEqual(isJSON(2014.5), false, '`2014.5`, should return false');
  t.deepEqual(isJSON([1,2,3,4]), false, '`[1,2,3,4]`, should return false');
  t.deepEqual(isJSON({a: 12, b: [1,2,3]}), false, 'a JSON object `{a: 12, b: [1,2,3]},`, should return false');
  t.deepEqual(isJSON({a: 12, b: [1,2,3]}, true), true,
              'a JSON object `{a: 12, b: [1,2,3]}` but pass the 2 arg as true (check objects too), should return true');
  t.deepEqual(isJSON('{"a":"obja","b":[0,1,2],"c":{"d":"some object"}}'), true,
              '`{"a":"obja","b":[0,1,2],"c":{"d":"some object"}}`, should return true');
  t.deepEqual(isJSON('1,2,3'), false, '`1,2,3`, should return false');
  t.deepEqual(isJSON('{1,2,3}'), false, '`{1,2,3}`, should return false');
  t.deepEqual(isJSON('[{"a": 123}, {1,2,3}}]'), false, '`[{"a": 123, {1,2,3}}]`, should return false');
  var cobj = '[{"a": {"aa": [1,2,3,4], "aaa": {"d": 1212}}}, {"b": "test", "c": [1,2,3], "date": "' + new Date() + '}]';
  t.deepEqual(isJSON(cobj), true, cobj + ', should return true');
  t.deepEqual(isJSON(new Date()), false, '`Date`, should return false');
  t.deepEqual(isJSON.strict('{\n "config": 123,\n "test": "abcde" \n}'), true, '`{\n "config": 123,\n "test": "abcde" \n}`, should return true');
});
