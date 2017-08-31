<!--
  Author: jiajun.he@partner.midea.com
  Create: 2017-03-18
  当masker启动时,会禁用全局滚动效果,为禁止ios出现弹性滑动效果
-->
<template>
    <div :id="randomId" class="sakuraMasker backdrop visible hide" @click="onClick">
        <slot></slot>
    </div>
</template>
<script>
    /* eslint-disable */
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            canClose: {
                type: Boolean,
                default: false
            }
        },
        date () {
            return {
                cache: this.show
            };
        },
        computed: {
            randomId: function () {
                return Math.random().toString(36).substr(2);
            }
        },
        mounted () {
            this.cache = this.show;
        },
        methods: {
            onClick () {
                if (this.canClose) {
                    this.$emit('value-change', false);
                }
            },
            active(val) {
                var el = document.getElementById(this.randomId);

                if (val) {
                    el.className = el.className.replace(' hide', '');
                    setTimeout(() => {
                        el.className += ' active';
                    }, 1);
                } else {
                    el.className = el.className.replace(' active', '');
                    setTimeout(() => {
                        el.className += ' hide';
                    }, 200);
                }
            },
            scrollerEvent(ev) {
                ev.preventDefault();
            },
            closeDefaultScroller(val) {
                if(val) {
                    document.addEventListener('touchmove', this.scrollerEvent, false);
                } else {
                    document.removeEventListener('touchmove', this.scrollerEvent, false);
                }
            }
        },
        watch: {
            show (val) {
                this.cache = val;
                this.closeDefaultScroller(val);
                this.active(val);
            }
            /*      cache (val) {
             this.show = val;
             this.active(val);
             this.$emit('value-change', val);
             }*/

        }
    };
</script>
<style lang="less" scoped>
    .backdrop {
        position:fixed;
        top:0;
        left:0;
        z-index:11;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,.4);
        visibility:hidden;
        opacity:0;
        -webkit-transition:opacity .1s linear;
        transition:opacity .1s linear
    }
    .backdrop.visible {
        visibility:visible
    }
    .backdrop.active {
        opacity:1
    }
    .hide {
        display: none;
    }
</style>
