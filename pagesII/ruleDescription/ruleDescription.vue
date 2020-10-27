<template>
	<view>
		<view class="tui-paddingTop" v-for="(item,index) of agreeList" :key="index">
			<tui-list-cell @click="detail(item.id)" :arrow="true" unlined >
				<view class="tui-item-box">
					<view class="tui-list-cell_name">{{item.title}}</view>
				</view>
			</tui-list-cell>
		</view>
	</view>
</template>

<script>
	import {
		listing2,
	} from '../../api/api.js'
	import {
		getAgreeList
	} from '../../api/request.js'
	export default {
		data() {
			return {
				agreeList: []
			}
		},
		onLoad() {
		this.getList()	
		},
		methods: {
			getList() {
				listing2(getAgreeList).then(res=> {
					let list = res.data.data
					let arr = []
					let ids = ["1319827321417515008","1319827163120287744","1304408017931272192"]
					list.forEach((item=> {
						let idx = ids.indexOf(item.id)
						if (idx !== -1) {
							arr.push(item)
						}
					}))
					this.agreeList = arr
				})
			},
		
			detail(id){
				uni.navigateTo({
					url: "../../pagesIII/serviceAgreement/serviceAgreement?id=" + id
				})
			}
		}
	}
</script>

<style>
page {
		background-color: rgba(245, 245, 245, 1);
	}
	.tui-paddingTop{
		padding-top: 3rpx;
	}
	.tui-title {
		width: 100%;
		padding-left: 20rpx;
		box-sizing: border-box;
		
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tui-switch {
		transform: scale(0.8);
		transform-origin: 100% center;
	}
	
.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}
	.tui-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
