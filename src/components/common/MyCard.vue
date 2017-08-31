<!--
 /**
 * @description:卡片组件
 * @author：xingwu.chen@partner.midea.com
 * @update:2017-08-18
 * @version
 */
-->
<template>
    <div>
        <div class="personal-card">
            <flexbox :gutter="0" wrap="wrap" class="con-wrap">
                <flexbox-item :span="12">
                    <div class="content-handler" v-if="isShowTitle">
                        {{title}}
                        <span class="content-handler-right">{{handleState}}</span>
                    </div>
                </flexbox-item>
                <flexbox-item :span="9">
                    <div class="content-left">
                        <div class="con-left" v-if="isShowImg">
                            <!-- 图片容器 -->
                            <div class="img-wrap">
    
                            </div>
                        </div>
                          <div class="con-right">
                            <p class="col-title">{{appeal || workName}}</p>
                            <div class="col-date">{{createdTime || position}}</div>
                        </div>  
                    </div>
                </flexbox-item>
                 <flexbox-item :span="3">
                    <div class="content-right handle" @click.stop.prevent="onClick">{{handleState}}</div>
                </flexbox-item> 
                <flexbox-item :span="12">
                    <div class="content-bottom">
                        <div class="title" :class="{'handle-title': hasHandleCircle}">
                            <!-- 正由 服务台组 汪文俊 处理中 -->
                            处理意见：已告知用户发邮件到5000重置密码
                        </div>
                        <div class="btn-wrap">
                            <div class="btn-area" v-if="isShowBtn">
                                <span v-if="isHandlerBtn" @click.stop.prevent="onClick">处理人</span>
                                <span v-if="isRemindersBtn" @click.stop.prevent="onClick">催办</span>
                                <span v-if="isAssessmentBtn" @click.stop.prevent="onClick">评价</span>
                            </div>
                        </div>
                    </div>
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
        title: String,//卡片的标题
        appeal: String,//诉求内容
        handler: String,//处理人
        createdTime: String,//创建时间
        handleState: String,//处理状态
        workName:String,//姓名
        position:String,//职位
        description:String,
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
        isShowTitle: {//是否显示标题
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
.personal-card {
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
            color: #6CC60A ;
            font-size: 13px;    
            // text-align: right;
            float: right;
        }
        .content-left {
            display: flex;
            flex-flow: wrap;
            align-items: center;
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
        .content-bottom {
            border-top: 1px solid #f0f0f0;
            padding: 10px 0 0 0;
            color: #6c6c6c;
            .title {}
            .handle-title {
                position: relative;
                margin-left: 15px;
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
            .btn-wrap {
                margin-top: 20px;
                text-align: right;
                .btn-area {
                    span {
                        display: inline-block;
                        padding: 5px;
                        border-radius: 4px;
                        border: 1px solid #dbdbdb;
                        text-align: center;
                        width: 64px;
                    }
                }
            }
        }
    }
}
</style>
