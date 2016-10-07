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
var x = 
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
