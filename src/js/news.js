import ajax from '../util/ajax';

let tmp = {number: 10, type: 1};
ajax.get(ajax.api.GET_NEWS_INFO, 
	tmp, 
	function(data){			
		console.log(data);			
	},
	function(err){
		console.log(err);
	});