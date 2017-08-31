// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import App from './App'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router.conf.js'
import store from './store'
import http from './store/http.js'//http拦截器
import FastClick from 'fastclick'//解决300ms点击延迟
import VueI18n from 'vue-i18n' //国际化语言

import language_EN from './js/language_EN.js' //国际化语言 （英文）
import language_CN from './js/language_CN.js' //国际化语言 （中文）
import language_TW from './js/language_TW.js' //国际化语言 （繁体）
// import ToastPlugin  from 'vux' //提示语组件

import VideoPlayer from 'vue-video-player'

import VideoHls from 'videojs-contrib-hls'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
                   
// require with Node.js/Webpack
// var VideoPlayer = require('vue-video-player')
// The default is to turn off some of the features, you can choose according to their use of certain features enabled, 
//do not enable the introduction will not require the corresponding file.
// 默认有些功能是不开启的，比如youtube国内不能用，则默认是关闭的，如果不启用对应的功能，则不会引入对应的包，减少项目代码体积，
//当然也有可能意味着对应的功能可能会出错，true 是开启，false是关闭，正常情况使用者不需要care就可以。
// Example(Only applies to the current global mode). 用配置项的话仅支持全局模式来配置，否则不会生效
// VideoPlayer.config({
//   youtube: true, // default false
//   switcher: true, // default true
//   hls: true // default true
// })



let loading = require('./js/loading')();
let infiniteScroll =  require('vue-infinite-scroll');
const VueAwesomeSwiper = require('vue-awesome-swiper');
Vue.use(VueAwesomeSwiper);
Vue.use(infiniteScroll);
Vue.use(VueRouter);
Vue.use(VueI18n);//国际化语言
Vue.use(VideoPlayer);//直播视频
Vue.use(VideoHls);//直播视频
// Vue.use(ToastPlugin);//提示语

// Vue.prototype.HOST = '/api';

let language = (navigator.browserLanguage || navigator.language).toLowerCase();//浏览器语言判断
console.log(language);

const messages = {
  en: {
    _language: language_EN//国际化语言 （英文）
  },
  zh: {
    _language:  language_CN//国际化语言 （中文）
  },
  tw: {
    _language:  language_TW//国际化语言 （繁体）
  }
}

//国际化语言
const i18n = new VueI18n({
  locale: "zh" ,//CONFIG.lang,  // 语言标识 默认中文
  messages
})



const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
};
const router = window.router = new VueRouter({
  scrollBehavior,
  routes
});


/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,//国际化语言
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
}).$mount('#app');
