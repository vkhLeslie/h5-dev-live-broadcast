<style>
  @import "./assets/css/animate.css";
</style>
<style lang="less">
  @import "./assets/css/ajax.loading.less";
  @import "~assets/css/base.less";
</style>
<template>
  <div>
    <router-view></router-view>
    <!-- 頁面提示语 -->
   <Toast v-model="showToast"  type="text" :text="toastConfig.msg" :width="toastConfig.width" @on-hide="hideToast" :time="toastConfig.time"></Toast>
  </div>
</template>

<script>
  /* global $common */
  import { mapState, mapGetters } from 'vuex';
  import { Toast } from 'vux';
  import  platform from './platform'
  export default {
    components: {
      Toast
    },
    computed: mapState({
      showToast: state => state.toast.isShow,
      toastConfig: state => state.toast.config,
      token: state => state.token
    }),
    mounted() {
      document.addEventListener('deviceready', function () {
        platform.changeColor([255, 255, 255, 1]);
      }, false);
    },
    methods: {
        hideToast() {
        this.$store.commit('HIDE_TOAST');
        if (this.toastConfig.callBack) {
          this.toastConfig.callBack();
        }
      },
    }
  }
</script>


