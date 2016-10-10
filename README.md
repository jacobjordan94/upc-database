# upc-database.js
Node module for accessing the UPC Database (upcdatabase.org)

## Install
`npm install upc-database`

## Getting started 
Obtain an API key from [ucpdatabase.org](upcdatabase.org)

+ Require the module into your code: 
```javascript
var UPC = require('upc-database');
```
+ Add your API key
```javascript
var UPC = require('upc-database');
var upc = new UPC('api key here');
```
+ Make a request
```javascript
var UPC = require('upc-database');
var upc = new UPC('api key here');

upc.json('0111222333446', function(response){
  if(!response.serverError && response.valid){
    // successful request
    console.dir(response.upc);
  } else if(!response.serverError && !response.valid){
    // successful request but invalid API request (ex: Invalid UPC code given)
    console.log(response.reason);
  } else {
    // server error (404, 403, etc.)
    console.log('server error'); 
  }
});
```
_Output_
```javascript
{ statusCode: 200,
  serverError: false,
  valid: true,
  upc:
   { number: '0111222333446',
     itemname: 'UPC Database Testing Code',
     alias: 'Testing Code',
     description: 'http://upcdatabase.org/code/0111222333446',
     avg_price: '123.45',
     rate_up: '12',
     rate_down: '2' 
   } 
}
```

+ Or for XML
```javascript
upc.xml('0111222333446', function(resp){
	if(!resp.serverError && resp.valid){
		console.dir(resp);
	} else if(!resp.serverError && !resp.valid){
		console.log(resp.reason); 
	} else {
		console.log('server error');
	}
});
```
_Output_ 
```
 '<?xml version="1.0" encoding="ISO-8859-1"?>
  <output xmlns="http://www.upcdatabase.org/">
    <number>0111222333446</number>
    <itemname>UPC Database Testing Code</itemname>
    <alias>Testing Code</alias>
    <description>http://upcdatabase.org/code/0111222333446</description>
    <avgprice>123.45</avgprice>
    <rate_up>12</rate_up>
    <rate_down>2</rate_down>
  </output>'
```

## API error codes 
```
101 - API Key length is incorrect
105 - API Key incorrect
199 - No more API requests remaining
201 - You did not enter a code
205 - The code you entered was non-numeric
301 - Code does not exist
500 - High server load
```
