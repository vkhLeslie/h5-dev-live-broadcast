import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
// import actions from
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    
  },
  state: {
    token: true,
    ssoToken: '',
    /*tenantId: '81920358843678720', // 租户ID
    mipId : 'vqrWLABZgUQpmrcNwRdsu7960NsCs9hL8K4PX%2BVJiZH%2BBGckVwXdSA%3D%3D',
    deviceId  : '825d90e02e31ec2073bd8b6bb3058520', // 设备id  手机的唯一标示*/
    tenantId: '81920358843678720', // 租户ID
    mipId : '',
    deviceId  : '', // 设备id  手机的唯一标示
    deviceInfo: {},
    userInfo: {
      user:{
        userName:"",
        mobile:""
      },
    },
    toast: {
      isShow: false,
      config: {
        msg: '',
        width: '7.6em',
        time: 2000//提示语，timeout
      }
    }
  },
  // actions,
  mutations
});
