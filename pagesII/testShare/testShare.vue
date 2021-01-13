<template>
	<view v-if="!canShow">
		<canvas @click="clickCanvas" style="background-color: rgba(0,197,42,.2);" :style="{ width: canvasW / 2+ 'px', height: canvasH / 2+ 'px' }" canvas-id="sharePost"></canvas>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canShow: false,
				canvasW: 750,
				canvasH: 1206,
				mainImg: "",
				SystemInfo: {},
				title: '田阳巨无霸桂七芒果1个500克以上', // 商品标题
				price: '999.99', // 价格
				Oldprice: '350.00', // 原价
				name: '天涯过客', // 推荐人
			}
		},
		
		async onLoad(options) {
			if (options.scene) {
				let scene = decodeURIComponent(options.scene)
			}
			this.SystemInfo = await this.getSystemInfo();
			this.mainImg = await this.getImageInfo(
				"https://qg-qr.oss-cn-shenzhen.aliyuncs.com/test/1609933250271.jpg?Expires=1925293249&OSSAccessKeyId=LTAI4G74cnhsbDWNkfvuNew3&Signature=liYq8qCQDtyGq0C3dY2hp2ANeAw%3D"
			)
			this.canvasW = this.SystemInfo.windowWidth * 2; // 画布宽度
			this.canvasH = this.SystemInfo.windowHeight * 2; // 画布高度
			console.log(this.SystemInfo.windowWidth,this.SystemInfo.windowHeight,this.canvasW,this.canvasH)
			this.drawCanvas()
			
		},
		methods: {
			drawCanvas () {
				if (this.mainImg.errMsg == 'getImageInfo:ok' && this.SystemInfo.errMsg == 'getSystemInfo:ok') {
					setTimeout(() => {
						const ctx = uni.createCanvasContext('sharePost', this)
						// 设置矩形边框
						ctx.setFillStyle("#FFF");
						// 设置矩形宽高 （x,y,宽度，高度） x这里要除2次 ‘2’，
						// 第一次除是因为canvasW是乘了2的值，这里需要还原成没乘之前的值，
						// 第二次除是因为得到的是 2边空白的宽度，
						ctx.fillRect(this.canvasW / 2 * 0.1 / 2, this.canvasW / 2 * 0.1 / 2, this.canvasW / 2 * 0.9, this.canvasH / 2 - this.canvasW / 2 * 0.1 ) // fillRect(x,y,宽度，高度)
				
						// 商品主图
						ctx.drawImage(this.mainImg.path, this.canvasW / 2 * 0.1, this.canvasH / 2 * 0.1 / 1.5, this.canvasW / 2 * 0.8,
							this.canvasW / 2 * 0.8)
				
						// 3、绘制商品标题，多余文字自动换行
						ctx.setFontSize(18); // setFontSize() 设置字体字号
						ctx.setFillStyle('#000'); // setFillStyle() 设置字体颜色
				
				
						/* canvas不能自动换行，需要自行计算 */
						let _strlineW = 0;
						let _strLastIndex = 0; //每次开始截取的字符串的索引
						let _strHeight = this.canvasW / 2 * 0.8 + this.canvasH / 2 * 0.1 + 10; //绘制字体距离canvas顶部的初始高度
						let _num = 1;
						for (let i = 0; i < this.title.length; i++) {
							_strlineW += ctx.measureText(this.title[i]).width;
							if (_strlineW > this.canvasW / 2 * 0.8 - 10) {
								if (_num == 2 && 2) {
									//文字换行数量大于二进行省略号处理
									ctx.fillText(this.title.substring(_strLastIndex, i - 5) + '...', this.canvasW / 2 * 0.1, _strHeight);
									_strlineW = 0;
									_strLastIndex = i;
									_num++;
									break;
								} else {
									ctx.fillText(this.title.substring(_strLastIndex, i), this.canvasW / 2 * 0.1, _strHeight);
									_strlineW = 0;
									_strHeight += 30;
									_strLastIndex = i;
									_num++;
								}
							} else if (i == this.title.length - 1) {
								ctx.fillText(this.title.substring(_strLastIndex, i + 1), this.canvasW / 2 * 0.1, _strHeight);
								_strlineW = 0;
							}
						}
						/* end */
				
						//4、商品价格
						ctx.setFontSize(14) // 字号
						ctx.setFillStyle('#e31d1a') // 颜色
						ctx.fillText('￥', this.canvasW / 2 * 0.1, _strHeight + 40); // （文字，x，y）
						
						ctx.setFontSize(24) // 字号
						ctx.setFillStyle('#e31d1a') // 颜色
						ctx.fillText(this.price, this.canvasW / 2 * 0.1 + 14, _strHeight + 40); // （文字，x，y）
						
						ctx.setFontSize(14)
						ctx.setFillStyle('#b8b8b8')
						ctx.fillText('原价￥' + this.Oldprice, this.canvasW / 2 * 0.1 + 100, _strHeight + 40);
				
						//5、文案
						ctx.setFontSize(14)
						ctx.setFillStyle('#b8b8b8')
						ctx.fillText('长按或扫描识别二维码', this.canvasW / 2 * 0.1, _strHeight + 80);
						
						//5、公司名称
						ctx.setFontSize(12)
						ctx.setFillStyle('#000')
						ctx.fillText('南宁·圈果平台', this.canvasW / 2 * 0.1, this.canvasH/ 2 - 50);
						
						// 商品菊花图
						ctx.drawImage('../../static/images/jhm.jpg', this.canvasW / 2 - this.canvasW / 2 * 0.34 , this.canvasH / 2 - this.canvasW / 2 * 0.38  , this.canvasW / 2 * 0.25,
							this.canvasW / 2 * 0.25)
						
						// 最终绘制
						ctx.draw(true, (ret) => { // draw方法 把以上内容画到 canvas 中。
							// uni.showToast({
							// 	icon: 'success',
							// 	mask: true,
							// 	title: '绘制完成',
							// });
							uni.canvasToTempFilePath({ // 保存canvas为图片
								canvasId: 'sharePost',
								x: 0,
								y: 0,
								quality: 1,
								complete: function(res) {
									// 在H5平台下，tempFilePath 为 base64, // 图片提示跨域 H5保存base64失败，APP端正常输出临时路径
									// console.log(res)
								},
							})
						});
						
					}, 1500)
				}	
			},
			clickCanvas () {
				this.canShow = !this.canShow
			},
			// 获取图片信息
			getImageInfo(image) {
				return new Promise((req, rej) => {
					uni.getImageInfo({
						src: image,
						success: function(res) {
							req(res)
						},
					});
				})
			},
			// 获取设备信息
			getSystemInfo() {
				return new Promise((req, rej) => {
					uni.getSystemInfo({
						success: function(res) {
							req(res)
						}
					});
				})
			},
		},
	}
</script>

<style>
	page {
		background: #f7f7f7;
	}
</style>
