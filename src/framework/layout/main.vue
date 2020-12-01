<template>
	<el-main class="main"  :style="{marginLeft:layoutMarginLeft+'px',marginTop:LayoutHeaderHeight+'px',padding:0}">
		<transition name="fade-transform" mode="out-in">
		<keep-alive>
			<router-view v-if="route.meta.keepAlive" :style="{zIndex: 0,width: viewWidth + 'px', height: viewHeight + 'px', backgroundColor: 'rgba(255, 255, 255, 1)'}"></router-view>
			<router-view v-if="!route.meta.keepAlive" :style="{zIndex: 0,width: viewWidth + 'px', height: viewHeight + 'px', backgroundColor: 'rgba(255, 255, 255, 1)'}"></router-view>
		</keep-alive>
		
	</transition>
	</el-main>
</template>

<script>
	export default {
		name: "main",
		components: {
		},
		data() {
			return {
				LayoutHeaderHeight: 50, // 50
				layoutMarginLeft: 210,
				viewWidth: 0,
				viewHeight: 0,
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight,
			}
		},
		created() {
			// watch window size change
			window.addEventListener(
				"resize",
				() => {
					this.windowWidth = window.innerWidth;
					this.windowHeight = window.innerHeight;
				},
				false
			);
			this.computedStyle();
		},
		watch: {
			windowWidth(val) {
				this.computedStyle();
			},
			windowHeight(val) {
				this.computedStyle();
			},
			route(val) {
				this.computedStyle();
			}
		},
		methods: {
			computedStyle() {
				let route = this.route;
				let meta = route.meta;
				let windowWidth = this.windowWidth;
				let windowHeight = this.windowHeight;
				if (meta.isShowLeftSider) {
					this.layoutMarginLeft = 210;
					this.viewWidth = windowWidth - this.layoutMarginLeft;
				} else {
					this.layoutMarginLeft = 0;
					this.viewWidth = windowWidth;
				}
				if (meta.isShowHeader) {
					// iview fix header heiget 64px
					this.LayoutHeaderHeight = 54;
					this.viewHeight = windowHeight - this.LayoutHeaderHeight;
				} else {
					this.LayoutHeaderHeight = 0;
					this.viewHeight = windowHeight;
				}
			},
			handleRefresh() {
				window.location.reload();
			}
		},
		computed: {
			path() {
				return this.$route.path;
			},
			route() {
				console.log(this.$route.meta);
				return this.$route;
			},
			user() {
				return this.$store.state.user;
			}
		}
	}
</script>

<style scoped>
 .haha-leave-active {
	  transition: opacity .5s;
	}
	.haha-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	.main {
			transition: margin-left 0.3s;
			margin-left: 200px;
	}
</style>