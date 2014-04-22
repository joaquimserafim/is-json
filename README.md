# is-json

<a href="https://nodei.co/npm/is-json/"><img src="https://nodei.co/npm/is-json.png?downloads=true"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/is-json.png?branch=master)](https://travis-ci.org/joaquimserafim/is-json)


check if a string is a valid JSON string without using Try/Catch and is a JSON object



**V1.1**


isJson(str*, [passObjects=bool])

*with `passObjects = true` can pass a JSON object in `str`, default to `false`


	  var isJson = require('is-json');

	  var good_json = '{"a":"obja","b":[0,1,2],"c":{"d":"some object"}}';
	  var bad_json = '{"a":"obja""b":[0,1,2],"c":{"d":"some object"}}';
	  var str_number = '121212';


	  console.log(isJson(good_json)); // true
      console.log(isJson(bad_json)); // false
	  console.log(isJson(str_number)); // false



	  // v1.1 now can check is a JSON object

	  var json = {a: 12, b: [1,2,3]};

	   console.log(isJson(json, true)); // true