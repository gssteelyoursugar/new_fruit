// 公用地址


//测试用
// let url = 'https://meituan.thexxdd.cn/api/'
// 登录测试用
let wxloginurl = `${url}wxuser/wxlogin`
// //本地商品
// let url = 'http://192.168.1.10:8980/'
// let url2 = 'http://192.168.1.10:8080/'
// // 线上
// let url = 'https://cs.zgqgpt.com/'
let url2 = 'https://cs.zgqgpt.com/'
let url = "http://testqg.natapp1.cc/"
// let url = 'http://dwh.natapp1.cc/js/'
let imgurl = 'http://192.168.1.10:8980'


//测试




// 首页
let getIndex = `${url}api/wx/index/getData`

// 进口水果/金刚区
let getselectImport = `${url}api/wx/index/selectImport`


// 热门水果/金刚区
let getselectHot = `${url}api/wx/index/hot`



// 热门水果/金刚区
let getselectSeasonal = `${url}api/wx/index/seasonal`


// 超值专区/金刚区
let getselectSuper = `${url}api/wx/index/selectSuper`


//首页分类
let getClassify = `${url}api/wx/index/indexClassify`

//首页资讯
let getMsg = `${url}api/wx/index/msgList`

//资讯详情
let getMsgInfo = `${url}api/wx/index/getMsg`

//商品详情页
let postdelist = `${url}api/wx/goods/getById`

//商品找水果
let getGoodsall = `${url}api/wx/goods/all`

//品种种类
let getAttribute = `${url}api/wx/goods/selectAttribute`

//鲜果上市所有水果
let getNewsAll = `${url}api/wx/goods/selectNewsAll`


//排行榜
let postOrder = `${url}api/wx/goods/order`


//限量区列表
let getActivity = `${url}api/wx/activity/select`


//限量区时间
let postActivity = `${url}api/wx/activity/select`


//登录
let loginis = `${url}api/wx/user/login`

//找水果
let getsearch = `${url}api/wx/menu/select`


//获取申请店铺信息
let getClient = `${url}api/wx/merchants/getClient`


//更新店铺信息
let postupdateClient = `${url}api/wx/merchants/updateClient`

//保存店铺
let postSaveStore = `${url}api/wx/merchants/saveStore`


//添加进货单
let postmyOrder = `${url}api/wx/cart/save`


//进货单列表
let getCart = `${url}api/wx/cart/select`


//订单详情
let getDetails = `${url}api/wx/order/getDetails`

//删除进货单
let postDelOrder = `${url}api/wx/cart/del`

//删除最近看过
let postRecentlyDel = `${url}api/wx/goods/delRecently`

//更新进货单
let postUpOrder = `${url}api/wx/cart/update`

//再次购买
let postAgainOrder = `${url}api/wx/order/againOrder`


//结算清单
let postDetailed = `${url}api/wx/order/detailed`

//文件上传
let uploading = `${url}api/wx/file/uploading`

//收藏商品
let postLike = `${url}api/wx/collection/save`

//收藏列表
let getLike = `${url}api/wx/collection/my`

//收藏列表
let postDelLike = `${url}api/wx/collection/del`

//点赞
let postPraise = `${url}api/wx/goods/savePraise`

//取消点赞
let postCancelPraise = `${url}api/wx/goods/cancelPraise`

//最近看过
let getRecently = `${url}api/wx/goods/recently`

//结算
let postSettle = `${url}api/wx/order/settle`

//提交订单/获得订单号才能支付
let getSubmitOrder = `${url}api/wx/order/submitOrder`


//我的订单
let getMyOrder = `${url}api/wx/order/myOrder`

//取消订单
let postCancelOrder = `${url}api/wx/order/cancelOrder`

//取消支付
let postCancelPay = `${url}api/wx/order/cancelPay`


//确认收货
let postConfirmOrder = `${url}api/wx/order/confirmOrder`

//删除订单
let postDelOrders = `${url}api/wx/order/del`

//支付订单
let postOrderPay = `${url}api/wx/order/orderPay`

//获取选择地址数据
let postAddressList = `${url}api/wx/area/treeDatClinet`

//提交售后
let posAfterSale = `${url}api/wx/wxOrderItemAfterSale/save`

//售后列表
let posAfterSaleList = `${url}api/wx/wxOrderItemAfterSale/list`

//售后详情
let posAfterDetails = `${url}api/wx/wxOrderItemAfterSale/details`

//取消申请售后
let postAfterCen = `${url}api/wx/wxOrderItemAfterSale/cancelAfter`

//确认售后
let PostDataById = `${url}api/wx/wxOrderItemAfterSale/confirm`

//待确认售后
let getBeConfirmed = `${url}api/wx/wxOrderItemAfterSale/toBeConfirmed`

//售后下拉数据
let getAfterSaleData = `${url}api/wx/afterSale/getAfterSaleData`

// //取消申请
// let postAfterCen = `${url}api/wx/wxOrderItemAfterSale/cancelAfter`

// 订单统计
let orderCount = `${url}api/wx/goods/totalGoods`

// 评价管理
let getEvaluateList = `${url}api/wx/evaluate/list`

//获取协议列表
let getAgreeList =  `${url}api/wx/ruleExplain/select`

//获取协议详情
let getAgreeInfo =  `${url}api/wx/ruleExplain/get`

 
 
//获取上市预告列表
let getPredictList =  `${url}api/wx/prediction/list`

//获取上市预告的详情
let getPredictInfo =  `${url}api/wx/prediction/getDetails`

//导出请求地址
export {
	getIndex,
	loginis,
	getsearch,
	postActivity,
	getClassify,
	postdelist,
	getGoodsall,
	getAttribute,
	url,
	postOrder,
	imgurl,
	wxloginurl,
	getActivity,
	postSaveStore,
	postmyOrder,
	getCart,
	postDelOrder,
	postUpOrder,
	postLike,
	getLike,
	postDelLike,
	postPraise,
	getRecently,
	postOrderPay,
	getMyOrder,
	getselectImport,
	getselectHot,
	getselectSeasonal,
	getselectSuper,
	postRecentlyDel,
	getNewsAll,
	getClient,
	postupdateClient,
	postAddressList,
	getSubmitOrder,
	postCancelPraise,
	getMsg,
	postSettle,
	postAgainOrder,
	getDetails,
	postCancelOrder,
	postDelOrders,
	postConfirmOrder,
	getAfterSaleData,
	posAfterSale,
	postCancelPay,
	posAfterSaleList,
	posAfterDetails,
	postAfterCen,
	PostDataById,
	getBeConfirmed,
	orderCount,
	getEvaluateList,
	getMsgInfo,
	getAgreeList,
	getAgreeInfo,
	getPredictList,
	getPredictInfo
}





// 导出文件上传
export const uploadFiles = (callback) => {
	uni.chooseImage({
		count: 1,
		success: (chooseImageRes) => {
			uni.showLoading({
				title: '上传中...'
			});
			const tempFilePaths = chooseImageRes.tempFilePaths;
			const uploadTask = uni.uploadFile({
				url: uploading, //上传地址api
				filePath: tempFilePaths[0],
				fileType: 'image',
				name: 'file',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'multipart/form-data',
				},
				formData: {
					'method': 'images.upload',
					'upfile': tempFilePaths[0]
				},
				success: (uploadFileRes) => {
					callback(JSON.parse(uploadFileRes.data));
				},
				fail: (error) => {
					if (error && error.response) {
						showError(error.response);
					}
				},
				complete: () => {
					setTimeout(function() {
						uni.hideLoading();
					}, 250);
				}
			});
		}
	});
}
