// MIT License

// Copyright (c) 2016 Jacob Jordan 

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/*
 * by Jacob Jordan (@JacobAJordan_)
 * jacobjordan94@live.com
 */

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
