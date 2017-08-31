import axios from 'axios';
import {configUrl, isPc, isTest} from '../store/config'


var ssoTokenName = isTest ? 'mideatest_sso_token' : 'midea_sso_token';//token
if ($envType.type === 2) {
  ssoTokenName = 'midea_sso_token'
}
var baseUrl = configUrl.baseUrl;
// function request();
// function get();
// function delete();
// function head();
// function post();
// function put();
// function patch();
/**
* @description:get
* @param {url, token, ssoToken, data} params
* @param {contentType} opts
*/
function get (params, opts) {

 let _opts = opts || {};
   //params.data.ssoTokenName = params.ssoToken || '';
let _url = isPc ? params.url : params.url + '?' + ssoTokenName + '=' + params.ssoToken;
 return axios({
   url: _url,
   method: 'get',
   baseURL: params.baseUrl || baseUrl,
   headers: {
     'Content-Type': _opts.contentType || 'application/json',
     'x-auth-token': params.token
   },
   params: params.data
 });
}

/**
* @description:post
* @param {url, token, ssoToken, data} params
* @param {contentType} opts
*/
function post (params, opts) {
 let _url = isPc ? params.url : params.url + '?' + ssoTokenName + '=' + params.ssoToken,
   _opts = opts || {},
   option = {
     url: _url,
     method: 'post',
     baseURL: params.baseUrl || baseUrl,
     headers: {
       'Content-Type': _opts.contentType || 'application/json',
       'x-auth-token': params.token
     },
     data: params.data
 };

 return axios(option);
}

/**
* @description:delete
* @param {url, token, ssoToken, data} params
* @param {contentType} opts
*/
function del (params, opts) {
 let _url = isPc ? params.url : params.url + '?' + ssoTokenName + '=' + params.ssoToken,
   _opts = opts || {},
   option = {
     url: _url,
     method: 'delete',
     baseURL: params.baseUrl || baseUrl,
     headers: {
       'Content-Type': _opts.contentType || 'application/json',
       'x-auth-token': params.token
     },
     data: params.data
   };

 return axios(option);
}
/**
* @description:jsonp
* @param {url, token, ssoToken, data} params
* @param {contentType} opts
*/
function jsonp(url, data, callback) {
  if (typeof data == 'string') {
    callback = data
    data = {}
  }
  var hasParams = url.indexOf('?')
  url += hasParams ? '&' : '?' + 'callback=' + callback
  var params
  for (var i in data) {
    params += '&' + i + '=' + data[i]
  }
  url += params

  var script = document.createElement('script')
  script.setAttribute('src', url)
  document.querySelector('head').appendChild(script)

}
/**
 * @description:request
 * @param {url, token, ssoToken, data} params
 * @param {contentType, method} opts
 */
function request(params, opts) {
  let _url = params.url;
  if (isPc) {
    _url = $common.formatUrl(params.url);
  } else {
    if (isTest) {
      _url = $common.formatUrl(params.url, {
        mideatest_sso_token: params.ssoToken
      });
    } else {
      _url = $common.formatUrl(params.url, {
        midea_sso_token: params.ssoToken
      });
    }
  }
  let _opts = opts || {},
    _data = params.data || {},
    option = {
      url: _url,
      method: _opts.method || 'post',
      baseURL: params.baseUrl || baseUrl,
      headers: {
        'Content-Type': _opts.contentType || 'application/json',
        'x-auth-token': params.token
      }
    };

  if (_opts.method === 'get') {
    option.params = _data;
  } else {
    option.data = _data;
  }

  return axios(option);
}

//resolve data
function resolve(rep, clback) {
  var data = rep.data;
  if (rep.status == 200) {
    clback && clback(data);
  }
  return data;
}

module.exports = {
  get,
  post,
  resolve,
  request,
  del
};
