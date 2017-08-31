<!--
 /**
 * @description:卡片状态组件
 * @author：xingwu.chen@partner.midea.com
 * @update:2017-08-18
 * @version
 */
-->
<template>
    <div>
        <div class="personal-state">
            <flexbox :gutter="0" wrap="wrap" class="con-wrap">
                <flexbox-item :span="12">
                    <div class="content-handler">
                        {{title}}
                        <span class="content-handler-right">{{handleState}}</span>
                    </div>
                </flexbox-item>
                <flexbox-item :span="12">
                    <div class="content-left">
                        <div class="con-right">
                            <p class="col-title">{{appeal}}</p>
                            <div class="col-date">{{description}}</div>
                        </div>
                    </div>
                </flexbox-item>
                <flexbox-item :span="12">
                    <div class="content-state">
                        <span class="handle-title"></span>
                        <i></i>
                        <span class="handle-title"></span>
                        <i></i>
                        <span class="handle-title-default"></span>
                        <i></i>
                        <span class="handle-title-default"></span>
                    </div>
                    <div class="content-title-state">
                        <span class="state-title">新建</span>
                        <i></i>
                        <span class="state-title">分派</span>
                        <i></i>
                        <span  class="state-title-default">处理</span>
                        <i></i>
                        <span class="state-title-default">评价</span>
                    </div>
                    <div class="content-time">已于2017-08-18 10:48分派</div>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>
<script>
import { Cell, CellBox, Flexbox, FlexboxItem, Card } from 'vux';
export default {
    components: {
        Flexbox,
        FlexboxItem,
    },
    created() {
    },
    props: {
        title: String,//卡片状态的标题
        appeal: String,//诉求内容
        handler: String,//处理人
        createdTime: String,//创建时间
        handleState: String,//处理状态
        workName: String,//姓名
        position: String,//职位
        description: String,
        isShowImg: {//是否显示头像,默认false
            type: Boolean,
            default: false
        },
        hasHandleCircle: {//是否显示处理zz内容圆点显示,默认false
            type: Boolean,
            default: false
        },
        isShowBtn: {//是否全部显示卡片右下角btn,默认false
            type: Boolean,
            default: false
        },
        isHandlerBtn: {//是否显示卡片右下角btn,默认false
            type: Boolean,
            default: false
        },
        isRemindersBtn: {//是否显示卡片右下角btn,默认false
            type: Boolean,
            default: false
        },
        isAssessmentBtn: {//是否显示卡片右下角btn,默认false
            type: Boolean,
            default: false
        },
        stepTotal: {
            type: Number,
            default: 0
        },
        handleClass: {
            type: String,
            default: ''
        }
    },
    computed: {
        hasStep() {
            return this.stepTotal > 0;
        }
    },
    data() {
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
.personal-state {
    font-size: 14px;
    height: 100%;
    .hidden {
        display: none;
    }
    .con-wrap {
        padding: 15px;
        background-color: #fff;
        margin-top: 10px;
        .content-handler {
            color: #bbb;
            font-size: 12px;
            margin-bottom: 15px;
        }
        .content-handler-right {
            color: #6CC60A;
            font-size: 13px; // text-align: right;
            float: right;
        }
        .content-left {
            display: flex;
            flex-flow: wrap;
            align-items: center;
            border-top: 1px solid #f0f0f0;
            padding: 10px 0 0 0;
            color: #6c6c6c;
            .con-left {
                margin-right: 18px;
                margin-top: -10px;
                .img-wrap {
                    background-color: #3da5f5;
                    border-radius: 50%;
                    width: 45px;
                    height: 45px;
                }
            }
            .con-right {
                .col-title {
                    font-size: 14px;
                    color: #000;
                    font-weight: 800;
                }
                .col-date {
                    padding: 10px 0 10px 0;
                    font-size: 12px;
                    color: #9c9c9c;
                }
            }
        }
        .content-right {
            color: #999999;
            position: relative;
            padding-right: 13px;
            text-align: right;
            &:after {
                content: " ";
                display: inline-block;
                height: 6px;
                width: 6px;
                border-width: 2px 2px 0 0;
                border-color: #C8C8CD;
                border-style: solid;
                transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
                position: relative;
                top: -2px;
                position: absolute;
                top: 50%;
                margin-top: -4px;
                right: 2px;
            }
            &.handle {
                color: #fbc770;
            }
        }
        .content-state:nth-child(1) {
            margin-left: 18px;
        }
        .content-state {
            .handle-title {
                position: relative;
                &:after {
                    content: "";
                    position: absolute;
                    top: 5px;
                    left: -12px;
                    width: 8px;
                    height: 8px;
                    background-color: #3da5f5;
                    border-radius: 50%;
                }
            }
            .handle-title-default {
                position: relative;
                margin-left: 3px;
                &:after {
                    content: "";
                    position: absolute;
                    top: 5px;
                    left: -12px;
                    width: 8px;
                    height: 8px;
                    background-color: #fff;
                    border: 1px solid #3da5f5;
                    border-radius: 50%;
                }
            }
            i {
                display: inline-block;
                height: 5px;
                width: 68px;
                border-width: 2px 0 0 0;
                border-color: #C8C8CD;
                border-style: solid;
            }
        }
        .content-title-state {
            .state-title {
              position: relative;
               // margin-left: 15px;
              font-size: 12px;
              color: #000000;
            }
            .state-title-default  {
              position: relative;
               // margin-left: 15px;
              font-size: 12px;
              color: #9B9B9B;;
            }
            i {
                display: inline-block; // height: 5px;
                // width: 68px;
                // border-width: 2px 0 0 0;
                // border-color: #C8C8CD;
                // border-style: solid;
                padding-right: 40px;
            }
        }
        .content-time {
            padding-top:10px;
            text-align: right;
            font-size: 12px;
            color: #666666;
        }
    }
}
</style>
