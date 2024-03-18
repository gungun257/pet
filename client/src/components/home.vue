<template>
	<div>
		<router-view></router-view>
		<van-tabbar v-model="active" @change="btn_bar">
			<van-tabbar-item name="index" icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item name="introduce" icon="shield-o">医院简介</van-tabbar-item>
			<van-tabbar-item name="mycenter" icon="friends-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 'index'
		}
	},
	created() {
		const active = localStorage.getItem('active');
		console.log(active, 123123123);
		if (active) {
			this.active = active
		} else {
			this.active = 'index';
		}
		this.$router.push("/" + this.active);
	},
	methods: {
		btn_bar() {
			this.$router.push("/" + this.active);
			localStorage.setItem('active', this.active);
		},

	},
	mounted() {

	}
}
</script>

<style></style>
