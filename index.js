var request = require('request');
var cheerio = require('cheerio');

class UPC{
	constructor(apiKey){
		this.apiKey = apiKey;
		this.baseURL = 'http://api.upcdatabase.org';
	}
	_buildQuery(code, format){
		return `${this.baseURL}/${format}/${this.apiKey}/${code}`; 
	}
	_makeJSONRequest(url, callback){
		request(url, function(err, response, body){
			var resp = {};
			resp.statusCode = response.statusCode; 
			if(!err && response.statusCode == 200){
				resp.serverError = false;
				body = JSON.parse(body);	
				resp.valid = body.valid == 'true';
				delete body.valid;
				if(!resp.valid){
					resp.reason = body.reason;
				} else {
					resp.upc = body;
				}
				callback(resp);
			} else {
				resp.serverError = true;
				callback(resp); 
			}
		});
	}
	_makeXMLRequest(url, callback){
		request(url, function(err, response, body){
			var resp = {};
			resp.statusCode = response.statusCode;
			if(!err && response.statusCode == 200){
				resp.serverError = false;
				var $ = cheerio.load(body, {xmlMode: true}); 
				resp.valid = $('valid').text() == 'true';
				$('valid').remove();
				if(!resp.valid){
					resp.reason = $('reason').text();
				} else {
					resp.upc = $.html().replace(/[\n\t]/g, '');
				}
				callback(resp);
			} else {
				resp.serverError = true;
				callback(resp);
			}
		});
	}
	_makeRequest(format, code, callback){
		var url = this._buildQuery(code, format);
		if(format == 'json'){
			this._makeJSONRequest(url, callback);
		} else {
			this._makeXMLRequest(url, callback);
		}
	}
	json(code, callback){
		this._makeRequest('json', code, callback);
	}
	xml(code, callback){
		this._makeRequest('xml', code, callback);
	}
}

module.exports = UPC;
