// 错误提示，反馈提示等。。。
const errdata = {
	errlist(err){
		uni.showToast({
			icon:'none',
		    title: err,
		    duration: 3000
		});
	}
}

export{errdata}