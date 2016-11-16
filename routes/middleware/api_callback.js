'use strict';
const apiUtil = require('../../util/apiUtil');

const api_callback = (req, res) => {
	apiUtil.request(req, (error, response, body) => {
		console.log("[ RESPONSE ] : ", body);
		res.send(body);
	});
}

module.exports = api_callback;