import _ from 'lodash';

class AJAX {
    constructor(){
        this.FABAO_WEBSITE = 'FABAO_WEBSITE';
        this.api = {
            GET_NEWS_INFO      : "/api/" + this.FABAO_WEBSITE + "/news/getnewsinfo",
            GET_NEWS_LIST      : "/api/" + this.FABAO_WEBSITE + "/news/getnewslist",
            GET_NEWS_DETAIL    : "/api/" + this.FABAO_WEBSITE + "/news/getnewsdetail",
            GET_NEWS_RECENT    : "/api/" + this.FABAO_WEBSITE + "/news/getrecentnews",
            GET_JOBS_INFO      : "/api/" + this.FABAO_WEBSITE + "/job/getjobinfo",
            GET_INVENTOR_INFO  : "/api/" + this.FABAO_WEBSITE + "/resource/getinventorinfo"
        }
    }

    get(url, data, success, fail, options){
        this.ajax(url, "GET", data, success, fail, options);
    }

    post(url, data, success, fail, options){
        this.ajax(url, "POST", data, success, fail, options);
    }

    ajax(url, type, data, success, fail, options){
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
            success: success,
            error: fail,
            dataType: "json"
        });
    }
}

module.exports = new AJAX();