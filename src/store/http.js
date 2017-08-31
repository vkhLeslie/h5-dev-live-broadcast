/**
 * @description:http响应拦截器 全局处理loading加载效果
 * @author：xingwu.chen@partner.midea.com
 * @update:2017-08-16
 * @version
 */
import axios from 'axios'
import Vue from 'vue'
import Promise from 'promise';
let loading = require('../js/loading')();
// 超时时间
axios.defaults.timeout = 5000;
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {//请求前的处理
    //  Loading方法
    loading.show();//显示加载效果
    console.log('请求前...',config);
    // if(config.url.indexOf('SAME_DOMAIN_API_URL') > -1) {
    //     config.headers['X-XSRF-TOKEN'] = $cookies.get('XSRF-TOKEN');
    //   }
    return config;
}, error => {
    loading.fail('加载超时');
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {//请求后的处理
    loading.hide();// 响应成功关闭loading
    console.log("请求成功后...",data);
    return data;
}, error => {
    loading.fail('加载失败');
    return Promise.reject(error)
})

export default axios