import _ from 'lodash';

class AJAX {
    constructor(){
        this.API_URL = 'API_URL';
        this.api = {
            LOGIN      : "/api/" + this.API_URL + "/login",            
        }
    }

    get(url, data, options){
        return this.ajax(url, "GET", data, options);
    }

    post(url, data, options){
        return this.ajax(url, "POST", data, options);
    }

    ajax(url, type, data, options){
        let promise = new Promise((resolve, reject)=>{
            let _url = url.indexOf('?') > -1 ? url : url + '?';
            _url += "nonce=" + Date.now();
            if(options){
                _.forEach(options, (v, k)=>{
                    _url += '&' + k + '=' + v;
                });
            }
            $.ajax({
                type: type,
                url: _url,
                data: data,            
                success: (res)=>{resolve(res);},
                error: (err)=>{reject(err);},
                dataType: "json"
            });
        });   
        return promise;     
    }
}

module.exports = new AJAX();