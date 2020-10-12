import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const screendata = {
	// 存储筛选出来的数据
	screenarr: []
}

// 数据仓库
const state = {
	screendata,
	history: uni.getStorageSync('history') ? uni.getStorageSync('history') : [],
	orderTime: uni.getStorageSync('orderTime') ? uni.getStorageSync('orderTime') : ''
}

export default new Vuex.Store({
	state,
	// 同步存储
	mutations: {
		screenmuta(state, listdata) {
			console.log(listdata)
			// 存储到数据仓库
			state.screendata = {
				screenarr: listdata
			}
		},
		// 保存搜索结果历史记录
		saveSearch(state, data) {
			let arr = state.history
			arr.unshift(data.data)
			let res = new Set(arr)
			state.history = Array.from(res)
			uni.setStorageSync('history', Array.from(res))
		},
		// 清空搜索结果历史记录
		clearSearch(state, data) {
			console.log(data)
			let list = state.history
			list = []
			state.history = list
			uni.removeStorageSync('history')
			uni.showToast({
				title: '已清除'
			})
		},
		setOrderTime(state, data) {
			console.log(data)
			state.orderTime = data.data
			uni.setStorageSync('orderTime', data.data)
		}
	}
})
