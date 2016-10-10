var UPC = require('upc-database'); 
var upc = new UPC('your key');

upc.json('0111222333446', function(resp){
	if(!resp.serverError && resp.valid){
		console.dir(resp);
	} else if(!resp.serverError && !resp.valid){
		console.log(resp.reason); 
	} else {
		console.log('server error');
	}
}); 

upc.xml('0111222333446', function(resp){
	if(!resp.serverError && resp.valid){
		console.dir(resp);
	} else if(!resp.serverError && !resp.valid){
		console.log(resp.reason); 
	} else {
		console.log('server error');
	}
});