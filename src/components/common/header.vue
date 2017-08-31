<!--
  Author: jiajun.he@partner.midea.com
  Create: 2017-03-07
  update:2017-08-22
  updateBy:xingwu.chen@partner.midea.com
-->
<template>
  <div>
    <div class="header" :class="headerClass">
      <span v-if="showBack" @click.stop.prevent="back" ><i class="iconfont back-left icon-zuojiantou"></i></span>
      <h2 class="title" :class="{'has-Step': hasStep}">{{title}}</h2>
      <span class="step" v-if="hasStep">{{step}}/{{stepTotal}}</span>
      <span class="header-right-item" @click.stop.prevent="onClick">{{rightItem}}<i class="red-dot" v-if="showRedDot && redDotCount">{{redDotCount}}</i></span>
    </div>
  </div>
</template>
<script>
  /* eslint-disable */
  export default {
      components: {
      },
      created () {
      },
      props: {
          title: String,
          rightItem: String,
          step: {
              type: Number,
              default: 0
          },
          stepTotal: {
              type: Number,
              default: 0
          },
          showBack: {
              type: Boolean,
              default: true
          },
          showRedDot: {
              type: Boolean,
              default: false
          },
          redDotCount: {
              type: Number,
              default: 0
          },
          headerClass: {
              type: String,
              default: ''
          }
      },
      computed: {
          hasStep() {
              return this.stepTotal > 0;
          }
      },
      data () {
          return {
          };
      },
      methods: {
          back() {
              this.$emit('previous');
          },
          onClick() {
              this.$emit('on-click');
          }
      },
      watch: {
      }
  };
</script>

<style lang="less">
  .header {
    .header-right-item {
      position: relative;
      color: #6a707d;
      margin-right: 20px;
      line-height: 45px;
      float: right;
    }
    .has-Step {
      top: -5px !important;
    }
    .step {
      position: absolute;
      right: 50%;
      bottom: 0;
      font-size: 12px;
    }
    .red-dot {
      position: absolute;
      right: -16px;
      top: 3px;
      width: 18px;
      height: 18px;
      font-size: 12px;
      line-height: 18px;
      font-style: normal;
      color: #fff;
      text-align: center;
      background-color: #ff5723;
      border-radius: 50%;
    }
       .back-left {
            color: #999;
            position: relative;
            padding-right: 13px;
            &:after {
                content: " ";
                display: inline-block;
                height: 10px;
                width: 10px;
                border-width: 2px 2px 0 0;
                border-color: #7F8389;;
                border-style: solid;
                transform: matrix(-0.71, -0.71, 0.71, -0.71, 0, 0);
                top: -2px;
                position: absolute;
                top: 50%;
                margin-top: -4px;
                left: 5px;
            }
            &.handle {
                color: #fbc770;
            }
        }
  }
  // 黑色主题
  .dark-theme {
    border-bottom: 0;
    background-color: #35495e;
    .icon-zuojiantou,
    .title,
    .header-right-item {
      color: #fff;
    }
  }
</style>
