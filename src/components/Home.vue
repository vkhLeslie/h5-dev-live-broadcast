<template>
	<div>
		<my-header :title="'直播'" :headerClass="'white-theme'" :showBack="true" @previous="exit()"></my-header>
		<div class="has-header player">
			 <!-- <video-player class="video-player-box" :options="playerOptions"></video-player> -->
			  <video-player class="vjs-custom-skin" 
                        :options="playerOptions" 
                        @ready="playerReadied">
            </video-player>
			 <div class="video-input">
				 <input type="text" v-model="hrefName"/>
				 <button @click="player(hrefName)">播放</button>
			</div>
			{{playerOptions.sources.src}}
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import MyHeader from './common/header';
import platform from '../platform'
require('videojs-contrib-hls/dist/videojs-contrib-hls')
export default {
	components: {
		MyHeader,
		// VideoPlayer
	},
	data() {
		return {
			hrefName: '',
			showIndex: false,
			subModuleName: null,
	 playerOptions: {
          // videojs and plugin options
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8"
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
		  poster: "",
		language: 'zh-CN',
        live: true,
        autoplay: true,
        },
	 videoOptions: {
        source: {
          type: "application/x-mpegURL",
          src: 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8',
          withCredentials: false
        },
        language: 'zh-CN',
        live: true,
        autoplay: true,
        height: 540
      },
		}
	},
	computed: {
		  reMsg:{
                    get:function(){
                        return this.msg.split('').reverse().join('')
                    },
                    set:function(value){
						console.log(value)
						console.log("*******************************")
                       return this.playerOptions.sources.src = value;  
                    }
                }
	},//实时计算
	methods: {
		exit() {//退出应用
			platform.exit();
		},
		 playerReadied(player) {
        var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
        player.tech_.hls.xhr.beforeRequest = function(options) {
           console.log(options)
          return options
        }
      },
		// platform.language();//多语言
        player(url){
			this.playerOptions.sources.src = url;
			this.reMsg = url;
			console.log(url);
			console.log(this.playerOptions.sources.src);
		},
		// 进入对应模块 路由跳转
		startModule(name) {
			// this.hrefName = "workDetail";
			// this.$router.push('/' + 'workDetail');
			console.log('路由开始跳转');
			if (name) {
				this.hrefName = name;
				this.$router.push(name);
				console.log(name);
				console.log("****************************************************************");
			} else {
				this.$store.commit('SHOW_TOAST', { msg: '此功能尚未开通', width: '9em' });
			}
		},
	},
	mounted() { },
	//首页每次跳转的时候请设置hrefName即跳转链接的名字，以此来判断用户离开路由时是跳转还是回退
	beforeRouteLeave(to, from, next) { //导航钩子函数 ,保证路由跳转成功
		//通常用来禁止用户在还未保存修改前突然离开
		//to: Route: 即将要进入的目标 路由对象(官方文档)
        //from: Route: 当前导航正要离开的路由(官方文档)
		//next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。(官方文档)
		//确保要调用 next 方法，否则钩子就不会被 resolved。(官方文档)
		if (this.hrefName) {
			next();//进行导航
			//next(false);//取消导航
		} else {
			platform.exit();//退出
		}
	}
}
</script>
<style lang="less">
@import "~assets/css/base.less";
@import "~assets/css/index.less";
.video-js{
	width:100% !important;
}
</style>
