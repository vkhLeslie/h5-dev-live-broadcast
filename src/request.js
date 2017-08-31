import axios from 'axios';

const get = function (config) {
  var options = {
    url: config.api,
    method: 'get',
    baseURL: config.baseURL,
    params: config.params
  };

  if (config.headers) {
    options.headers = config.headers;
  }

  return axios(options);
};
const post = function (config) {
  var options = {
    url: config.api,
    baseURL: config.baseURL,
    method: 'post',
    data: config.params
  };

  if (config.headers) {
    options.headers = config.headers;
  }

  return axios(options);
};

module.exports = {
  get,
  post
};
