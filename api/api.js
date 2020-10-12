// 封装请求：get post


// 引进提示
import {errdata} from 'api/errdata.js'


// GET带token
let listing = function(urling,shopdata){
	return new Promise((resolve,reject)=>{
		var setdata = uni.getStorageSync('usermen')//这个不能放外面，放外面的话，项目一运行的时候就执行了，没登入前就执行了，肯定拿不到token了
		shopdata.token = setdata
		uni.request({
			url:urling,
			method:'GET',
			data:shopdata
		})
		.then((res)=>{
			
			// console.log(res[1])
			resolve(res[1])
			
		})
		.catch((err)=>{
			let errs = '服务器错误 请稍后再试'
			errdata.errlist(errs)
			reject(err)
		})
	})
}

// GET不带token
let listing2 = function(urling,shopdata){
	return new Promise((resolve,reject)=>{
		// shopdata.token = setdata
		uni.request({
			url:urling,
			method:'GET',
			data:shopdata
		})
		.then((res)=>{
			
			// console.log(res[1])
			resolve(res[1])
			
		})
		.catch((err)=>{
			let errs = '服务器错误 请稍后再试'
			errdata.errlist(errs)
			reject(err)
		})
	})
}




// POST请求,后台默认键值对方式
let publicing = function(urling,shopdata){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:urling,
			method:'POST',
			data:shopdata,
			header: {
			    'content-type': 'application/x-www-form-urlencoded'
			   },
			
		})
		.then((res)=>{
			// console.log(res[1])
			resolve(res[1])
		})
		.catch((err)=>{
			let errs = '服务器错误 请稍后再试'
			errdata.errlist(errs)
			reject(err)
		})
	})
}

// POST,Json格式请求
let publicing2 = function(urling,shopdata){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:urling,
			method:'POST',
			data:shopdata,
			// header: {
			//     'content-type': 'application/x-www-form-urlencoded'
			//    },
			
		})
		.then((res)=>{
			// console.log(res[1])
			resolve(res[1])
		})
		.catch((err)=>{
			let errs = '服务器错误 请稍后再试'
			errdata.errlist(errs)
			reject(err)
		})
	})
}

//公用方法




export{listing,publicing,publicing2,listing2}