<script>
	import Utils from './common/js/utils.js'
	export default {
		onLaunch: function() {
			Utils.request({
				url:'/app/init',
				success:(res) => {
					uni.setStorageSync('cfg',res.data.cfg)
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			utils:Utils,
			orders_filt:''
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './app.css';
</style>
