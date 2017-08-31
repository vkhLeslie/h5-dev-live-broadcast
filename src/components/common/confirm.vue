<!--
  Author: jiajun.he@partner.midea.com
  Create: 2017-03-18
-->
<template>
  <masker :show="maskerShow" @value-change="onConfirmMasker">
    <div v-show="show" class="sakura-confirm-content animated zoomIn">
      <div class="row" style="min-height: 80px">
        <div class="icon col"><i class="iconfont icon-gantanhao"></i></div>
        <p class="text col">{{text}}</p>
      </div>
      <div class="row" style="margin-top: 10px">
        <div class="col text-center">
          <button :class="{'red': red}" @click.stop.prevent="confirmFn">{{delText || '确定'}}</button>
        </div>
        <div class="col col-50" v-if="hasCancel">
          <button @click.stop.prevent="cancelFn">{{cancelText || '取消'}}</button>
        </div>
      </div>
    </div>
  </masker>
</template>
<script>
  /* eslint-disable no-empty-label, space-after-keywords, space-return-throw-case */
  import masker from './masker';
  /* eslint-enable no-empty-label, space-after-keywords, space-return-throw-case */
  /* eslint-disable */
  export default {
      components: {
          masker
      },
      props: {
          show: {
              type: Boolean,
              default: false
          },
          red: {
              type: Boolean,
              default: false
          },
          text: '',
          hasCancel: {
              type: Boolean,
              default: true
          }
      },
      data() {
          return {
              delText: '',
              cancelText: '',
              s_: false // private show
          };
      },
      computed: {
          maskerShow: function () {
              return this.s_;
          }
      },
      methods: {
          onConfirmMasker(val) {
              this.s_ = val;
          },
          confirmFn() {
              this.s_ = false;
              this.$emit('on-confirm', false);
          },
          cancelFn() {
              this.s_ = false;
              this.$emit('on-cancel', false);
          }
      },
      watch: {
          show(val) {
              this.s_ = val;
          },
          s_(val) {
              this.$emit('value-change', val);
          }
      }
  };
</script>
<style lang="less" scoped>
  @import "../../assets/css/base.less";
  .sakura-confirm-content {
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    margin: auto;
    min-height: 150px;
    width: 85%;
    background-color: #fff;
    border-radius: 8px;
    max-width: 320px;
    z-index: 999;
  }
  .row {
    padding: 25px 15px 10px 15px;
  .col-50 {
      text-align: center;
  }
  &
  :last-child {
    /*padding-top: 10px;*/
  }

  button {
    width: 120px;
    height: 40px;
    background-color: transparent;
    border-radius: 6px;
    border: 1px solid #cecece;

  &.red {
    color: #ff5723;
  }

  }
  @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) {
    button {
      width: 110px;
    }
  }

  }
  .icon {
    position: relative;
      margin-right: 15px;
  .make-col(20%);
  .icon-gantanhao {
    color: #ff5723;
    font-size: 47px;
    position: absolute;
    text-align: center;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  }
  .text {
    text-align: left;
  .make-col(75%);
  }
  .text-center {
      text-align: center;
  }

</style>
