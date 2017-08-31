<style lang="less" scoped>
	@import "~assets/css/index.less";
</style>
<template>
	<div>Hello World.
		<button @click.stop.prevent="confirmShow=true">Click ME</button>
		<Confirm :show="confirmShow" :text="'NoWay'"  @value-change="(val) => confirmShow=val"></Confirm>
	</div>
</template>
<script>
/* eslint-disable */
import platform from '../platform';
import Confirm from './common/confirm';
export default {
    components: {
        Confirm
    },
    data() {
        return {
            confirmShow: false
        };
    },
    computed: {},
    methods: {},
    mounted () {},
    beforeRouteLeave() {}
};
</script>
