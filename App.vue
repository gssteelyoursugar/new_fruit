<script>
	//请求方式
	import {
		listing,
		
	} from './api/api.js';
	//请求地址
	import {
		getCart
	} from './api/request.js';
	export default {
		onLaunch: function() {
		},
		onShow () {
			this.orderIng()
		},
		onHide: function() {
		},
		methods: {
			orderIng() {
				let setdata = uni.getStorageSync('usermen');
				if (!setdata) {
					return
				}
				let data = {
					token: setdata
				};
				listing(getCart, data).then(res=> {
					if (res.data.code!=200) {
						return
					}
					if (res.data.data) {
						let {data} = res.data
						let cartNum = 0
						data.forEach(it=> {
							if (it.list) {
								cartNum += it.list.length
							}
						})
						if (data.length !== 0){
							uni.setTabBarBadge({
								index: 3,
								text: cartNum + ""
							})
						} else {
							uni.removeTabBarBadge({
								index: 3
							})
						}
						
					}
				
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import '/common/iconfont/iconfont.css';

	
	page{
		background-color: #f7f7f7;
	}
	::-webkit-scrollbar{
			width: 0;
			height: 0;
			color: transparent;
		}
</style>
