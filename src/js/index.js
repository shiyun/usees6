'use strict';
import ajax from './util/ajax'

ajax.post(ajax.api.LOGIN, {"organizeId":"1004","secret":"C6F215DAB70B852CED70853BE873DE3B"})
		.then(res=>{console.log(res);})
		.catch(err=>console.log(err));