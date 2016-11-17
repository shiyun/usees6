'use strict';
const request = require('request');
const _ = require('lodash');

class ApiUtil {
	constructor(){

	}

	dataCont(req, res){
		req.cont = {}
		let url = req.url.split('/');
		if(url.length < 4){
			res.send({header: {status: 0}, body:{msg: "请求接口路径有误"}});
			return ;
		}
		req.cont.server  = url[1];
		req.cont.command = url[2];
		if(url.length > 3){
			url.splice(0, 2);
			req.cont.command = url.join('/');
		}
		let method = req.method;
		if(method == 'POST'){
			req.cont.data = {data: req.body};
			req.cont.method = 'POST';
		}else{
			req.cont.data = {data: req.query};
			req.cont.method = 'GET';
		}
	}

	request(req, responseHandler){
		let data = req.cont;
		let url = global.CONFIG[req.cont.server] + req.cont.command;
		if(data.method == 'POST'){
			console.log(` ---------------------------------------------- \n [POST TO ${url}] \n ---------------------------------------------- `);
			request.post(url, responseHandler).form(data);
		}else{
			let params = '?';
			_.forEach(data.data, (v, k)=>{
				params += k + '=' + v + '&';
			});
			console.log(` ---------------------------------------------- \n [GET TO ${url}] \n ---------------------------------------------- `);
			request.get(url, responseHandler);
		}
	}

	api(req, res, responseHandler){
		this.dataCont(req, res);
		this.request(req, responseHandler);
	}
}

module.exports = new ApiUtil();