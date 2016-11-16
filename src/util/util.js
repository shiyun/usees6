function Util() {
    var isEmail = function (emailStr) {
        var emailPat=/^(.+)@(.+)\.(.+)$/;
        //var matchArray=emailStr.match(emailPat);
        var matchArray2=emailPat.test(emailStr);
        return matchArray2;
        /*
        if (matchArray==null) {
            return false;
        }
        return true;*/
    };
    var isPhone = function(phone){
        return phone.match(/^[1](\d{10})$/);
    };
    var isSMSCode = function (code) {
        return code.match(/^\d{6}$/);
    };
	var getCurrentUrlParam = function(paramName) {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split(/[&?]/);
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		if(!isEmptyData(vars[paramName])) {
			return vars[paramName];
		}
		else {
			return '';
		}
	};
	var isEmptyData = function(checkData) {
		if (checkData === '' || checkData === null || checkData === undefined || checkData === 'undefined'){
			return true;
		}
		else {
			return false;
		}
	};

    return {
        isEmail:isEmail,
        isPhone:isPhone,
        isSMSCode:isSMSCode,        
		isEmptyData: isEmptyData,
		getCurrentUrlParam: getCurrentUrlParam
    };
}