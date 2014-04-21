# is-json

<a href="https://nodei.co/npm/is-json/"><img src="https://nodei.co/npm/is-json.png?downloads=true"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/is-json.png?branch=master)](https://travis-ci.org/joaquimserafim/is-json)


check if a string is a valid JSON string without using Try/Catch



**V1**

    var isJson = require('is-json');
    
    var good_json = '{"a":"obja","b":[0,1,2],"c":{"d":"some object"}}';
    var bad_json = '{"a":"obja""b":[0,1,2],"c":{"d":"some object"}}';
    var str_number = '121212';
    
    
	console.log(isJson(good_json)); // true
	console.log(isJson(bad_json)); // false
	console.log(isJson(str_number)); // false