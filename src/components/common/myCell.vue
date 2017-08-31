<template>
  <div class="wrap">
      <a class="my-cell" @click = "onClick">

        <div class="title">
          <slot name="icon"></slot>
          <span style="color: red;" v-if="must">*</span>
          <span>{{title}}</span>
          <slot name="orgName"></slot><!--供给组织架构组件使用的部分,其他项目可以去除-->
        </div>
        <span class="value" :class="{'move-left': link}" v-if="hasInput">{{value}}</span>
        <slot></slot>
        <i v-if="link" class="iconfont icon-jiantouyou"></i>
      </a>
  </div>
</template>
<script>
  /* eslint-disable */
  export default {
      props: {
          title: {
              type: String
          },
          value: {
              type: String,
              default: ''
          },
          link: {
              type: Boolean,
              default: false
          },
          must: {
              type: Boolean,
              default: false
          },
          hasInput: {
              type: Boolean,
              default: false
          },
          tipsValue: {
              type: String,
              default: ''
          },
          inputValue: {
              type: String
          }
      },
      methods: {
          onClick() {
              this.$emit('on-click');
          }
      }
  };
</script>
<style lang="less" scoped>
  .wrap{
    margin:0 10px;
  }
  .my-cell {
    span{
      color:#6b6b6b;
    }
  @padding-lr: 20px;
    position: relative;
    display: flex;
    /*padding: 0 @padding-lr;*/
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    border-bottom: solid 1px #e0e0e0;
  .title {
    color: #000;
    width: 95px !important;
    font-size: 14px;
  }
  .value {
    flex: 1;
    font-size: 14px;
    text-align: right;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  &.move-left {
     padding-right: 26px;
   }
  }
  .icon-jiantouyou {
    position: absolute;
    right: 0;
    color: #dfdfdf;
    /*right: 10px;*/
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  /*&:last-child {*/
     /*border-bottom: solid 1px #e0e0e0;*/
   /*}*/
   input {
     font-size: 14px;
     border: 0;
   }
  }
</style>
