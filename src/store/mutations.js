const mutations = {
    //显示提示语
    SHOW_TOAST: (state, config) => {
        state.toast.isShow = true;
        state.toast.config.msg = config.msg;
        state.toast.config.width = config.width || '7.6em';
        state.toast.config.time = config.time || 2000;
        // state.toast.config.callBack = config.callBack || null;
      },
      //隐藏提示语
      HIDE_TOAST: (state, config) => {
        state.toast.isShow = false;
        // state.toast.config.msg = '';
        state.toast.config.width = '12em'; //todo: 这两句对消失效果有影响
        state.toast.config.time = 2000
      },

}
export default mutations
