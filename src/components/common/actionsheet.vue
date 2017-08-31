<!--
  Author: jiajun.he@partner.midea.com
  Create: 2017-03-18
-->
<template>
    <masker :show="maskerShow" @value-change="onActionSheetMasker" :canClose="true">
        <div class="sakura-acsh-content animated hide" :id="randomId">
            <div class="cell" v-for="item in list" :class="{'red': red && list.indexOf(item)+1 === list.length}" @click = 'onClick(item)'>{{item}}</div>
            <div class="opa"></div>
            <div class="cell cancel">取消</div>
        </div>
    </masker>
</template>
<script>
    /* eslint-disable */
    import masker from './masker.vue';
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
            list: {
                type: Array,
                default: []
            }
        },
        computed: {
            maskerShow: function () {
                return this.s_;
            },
            randomId: function () {
                return Math.random().toString(36).substr(2);
            }
        },
        data() {
            return {
                s_: false
            };
        },
        mounted() {

        },
        methods: {
            onActionSheetMasker(val) {
                this.elActive(val);
                this.s_ = val;
            },
            elActive(val) {
                var el = document.getElementById(this.randomId),
                    reg = '';

                if (val) {
                    reg = /slideInUp/;
                    if (!reg.test(el.className)) {
                        el.className += ' slideInUp';
                        el.className = el.className.replace(' slideOutDown', '');
                        el.className = el.className.replace(' hide', '');
                    }
                } else {
                    reg = /slideOutDown/;
                    if (!reg.test(el.className)) {
                        el.className = el.className.replace(' slideInUp', '');
                        el.className += ' slideOutDown';
                        setTimeout(() => {
                            el.className += ' hide';
                        }, 200);
                    }
                }
            },
            onClick(item) {
                this.$emit('on-select', item);
            }
        },
        watch: {
            show(val) {
                this.elActive(val);
                this.s_ = val;
            },
            s_(val) {
                this.$emit('value-change', val);
            }
        }
    };
</script>
<style lang="less" scoped>
    .sakura-acsh-content {
        position: fixed;
        background-color: #fff;
        width: 100%;
        bottom: 0;
        text-align: center;
        .cell {
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid rgba(206, 206, 206, .3);

            &.cancel {
                color: #5fb3ef;
            }
            &.red {
                 color: #ff9979;
             }
        }
        .opa {
            height: 15px;
            background-color: rgba(0,0,0,.3);
        }
    }
    .hide {
        display: none;
    }
</style>
