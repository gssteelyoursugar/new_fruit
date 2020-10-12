<template>
	<view v-if="isShow">
		<view 
		 :animation="maskAnim" 
		 @tap.stop="close"
		 class="wyb-popup-mask"
		 :style="{
			 backgroundColor: 'rgba(0, 0, 0, ' + maskAlpha + ')',
			 zIndex: zIndex - 1}" />
			 
		<view 
		 class="wyb-popup-box"
		 id="wyb-popup-content-box"
		 :animation="contentAnim"
		 :style="{
			 opacity: type === 'center' ? 0 : 1,
			 transform: autoTransform,
			 zIndex: zIndex,
			 position: 'fixed',
			 borderTopRightRadius: type === 'center' || type === 'bottom' || type === 'left' ? radius + 'px' : 0,
			 borderTopLeftRadius: type === 'center' || type === 'bottom' || type === 'right' ? radius + 'px' : 0,
			 borderBottomRightRadius: type === 'center' || type === 'top' || type === 'left' ? radius + 'px' : 0,
			 borderBottomLeftRadius: type === 'center' || type === 'top' || type === 'right' ? radius + 'px' : 0,
			 width: autoWidth,
			 height: autoHeight,
			 minWidth: width + 'rpx',
			 minHeight: height + 'rpx',
			 top: sizeChange && type === 'center' ? winReTop : autoTop,
			 bottom: autoBottom,
			 left: autoLeft,
			 right: autoRight,
			 backgroundColor: bgColor}">
			<view
			 class="wyb-popup-close"
			 v-if="showCloseIcon"
			 :style="{
				 width: closeIcon ? closeIconSize + 'rpx' : 'auto',
				 height: closeIcon ? closeIconSize + 'rpx' : 'auto',
				 top: closeIconPos === 'top-right' || closeIconPos === 'top-left' ? vertOffset + 'rpx' : 'auto',
				 bottom: closeIconPos === 'bottom-right' || closeIconPos === 'bottom-left' ? vertOffset + 'rpx' : 'auto',
				 left: closeIconPos === 'bottom-left' || closeIconPos === 'top-left' ? horiOffset + 'rpx' : 'auto',
				 right: closeIconPos === 'bottom-right' || closeIconPos === 'top-right' ? horiOffset + 'rpx' : 'auto'}">
				<image class="wyb-popup-custom-close" v-if="showCloseIcon&&closeIcon" :src="closeIcon" @tap="hide" :style="{
			 			 width: closeIconSize + 'rpx',
			 			 height: closeIconSize + 'rpx'}" />
			 	<view v-if="showCloseIcon&&!closeIcon" class="iconfont icon-close" @tap="hide" />
			</view>
			
			<scroll-view
			 class="wyb-popup-container"
			 :enable-flex="true"
			 :scroll-anchoring="true"
			 :show-scrollbar="showScrollbar"
			 :scroll-y="scrollY"
			 :scroll-x="scrollX">
				<slot></slot>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				w: uni.getSystemInfoSync().screenWidth,
				h: uni.getSystemInfoSync().screenHeight,
				eleW: 0,
				eleH: 0,
				isShow: false,
				contentAnim: {},
				maskAnim: {},
				winReBottom: '',
				winReTop: '',
				sizeChange: false
			}
		},
		computed: {
			autoCenterTop() {
				let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
				let windowHeight = uni.getSystemInfoSync().windowHeight
				let navHeight = 44
				let result = (((this.h - this.rpxToPx(this.height)) / 2) - navHeight - statusBarHeight - this.negativeTop) + 'px'
				// #ifdef H5
				result = ((windowHeight - this.rpxToPx(this.height)) / 2 - this.negativeTop) + 'px'
				// #endif
				// #ifdef MP-WEIXIN
				navHeight = wx.getMenuButtonBoundingClientRect().bottom
				result = ((this.h - this.rpxToPx(this.height)) / 2 - statusBarHeight - navHeight) + 'px'
				// #endif
				return result
			},
			autoTransform() {
				let result = ''
				switch(this.type) {
					case 'center':
						if (this.centerAnim === 'zoom-lessen') {
							result = 'scale(' + this.zoomLessenMulti + ')'
						} else if (this.centerAnim === 'slide-up') {
							result = 'translateY(' + 100 * this.slideMulti + '%)'
						} else if (this.centerAnim === 'slide-down') {
							result = 'translateY(' + -100 * this.slideMulti + '%)'
						} else if (this.centerAnim === 'fade') {
							result = 'auto'
						}
						break
					case 'bottom':
						result = 'translateY(100%)'
						break
					case 'top':
						result = 'translateY(-100%)'
						break
					case 'left':
						result = 'translateX(-100%)'
						break
					case 'right':
						result = 'translateX(100%)'
						break
				}
				return result
			},
			autoWidth() {
				if (this.type === 'center') {
					return this.width + 'rpx'
				} else {
					if (this.mode === 'size-fixed') {
						if (this.type === 'top' || this.type === 'bottom') {
							return '100%'
						} else {
							return this.width + 'rpx'
						}
					} else {
						if (this.type === 'top' || this.type === 'bottom') {
							return '100%'
						} else {
							return 'auto'
						}
					}
				}
			},
			autoHeight() {
				if (this.type === 'center') {
					return this.height + 'rpx'
				} else {
					if (this.mode === 'size-fixed') {
						if (this.type === 'left' || this.type === 'right') {
							return '100%'
						} else {
							return this.height + 'rpx'
						}
					} else {
						if (this.type === 'left' || this.type === 'right') {
							return '100%'
						} else {
							return 'auto'
						}
					}
				}
			},
			autoTop() {
				if (this.type === 'center') {
					return this.autoCenterTop
				} else if (this.type === 'bottom') {
					return 'auto'
				} else {
					return 0
				}
			},
			autoBottom() {
				if (this.type === 'center' || this.type === 'top') {
					return 'auto'
				} else {
					return 0
				}
			},
			autoLeft() {
				if (this.type === 'center') {
					return (this.w - this.rpxToPx(this.width)) / 2 + 'px'
				} else if (this.type === 'right') {
					return 'auto'
				} else {
					return 0
				}
			},
			autoRight() {
				if (this.type === 'center' || this.type === 'left') {
					return 'auto'
				} else {
					return 0
				}
			}
		},
		props: {
			type: {
				type: String,
				default: 'bottom'
			},
			mode: {
				type: String,
				default: 'size-auto'
			},
			height: {
				type: [String, Number],
				default: 400
			},
			width: {
				type: [String, Number],
				default: 500
			},
			radius: {
				type: [String, Number],
				default: 0
			},
			zIndex: {
				type: [String, Number],
				default: 10076
			},
			maskClickClose: {
				type: Boolean,
				default: true
			},
			maskAlpha: {
				type: Number,
				default: 0.5
			},
			duration: {
				type: Number,
				default: 400
			},
			showCloseIcon: {
				type: Boolean,
				default: false
			},
			scrollY: {
				type: Boolean,
				default: false
			},
			scrollX: {
				type: Boolean,
				default: false
			},
			closeIconPos: {
				type: String,
				default: 'top-right'
			},
			closeIcon: {
				type: String,
				default: ''
			},
			closeIconSize: {
				type: [String, Number],
				default: '20'
			},
			vertOffset: {
				type: [String, Number],
				default: '22'
			},
			horiOffset: {
				type: [String, Number],
				default: '22'
			},
			centerAnim: {
				type: String,
				default: 'zoom-lessen'
			},
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			zoomLessenMulti: {
				type: Number,
				default: 1.15
			},
			slideMulti: {
				type: Number,
				default: 1
			},
			negativeTop: {
				type: Number,
				default: 0
			},
			showScrollbar: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			// #ifdef H5
			let winHeight = uni.getSystemInfoSync().windowHeight
			uni.onWindowResize(res => {
				this.sizeChange = true
				if (this.type === 'bottom') {
					this.winReBottom = winHeight - res.size.windowHeight + 'px'
				} else if (this.type === 'center') {
					this.winReTop = ((res.size.windowHeight - this.rpxToPx(this.height)) / 2 - this.negativeTop) + 'px'
				}
			})
			// #endif
		},
		methods: {
			close() {
				this.maskClickClose && this.hide()
			},
			show() {
				this.isShow = true
				setTimeout(() => {
					setTimeout(() => {
						this.maskIn()
						this.contentIn()
						setTimeout(() => {
							this.$emit('show', {
								pageScroll: false, 
								overflow: 'hidden'
							})
						}, this.duration)
					}, 10)
				}, 1)
			},
			hide() {
				this.contentOut()
				this.maskOut()
				setTimeout(() => {
					this.isShow = false
					this.$emit('hide', {
						pageScroll: true, 
						overflow: 'scroll'
					})
					this.animation = {}
					this.contentAnim = {}
					this.maskAnim = {}
				}, this.duration + 1)
			},
			contentIn() {
				this.animation = uni.createAnimation({
					duration: this.duration,
					timingFunction: 'ease-out'
				})
				switch (this.type) {
					case 'center':
						if (this.centerAnim === 'zoom-lessen') {
							this.animation.opacity(1).scale(1).step()
						} else if (this.centerAnim === 'slide-up' || this.centerAnim === 'slide-down') {
							this.animation.opacity(1).translateY(0).step()
						} else if (this.centerAnim === 'fade') {
							this.animation.opacity(1).step()
						}
						break
					case 'bottom':
					case 'top':
						this.animation.translateY(0).step()
						break
					case 'left':
					case 'right':
						this.animation.translateX(0).step()
						break
				}
				this.contentAnim = this.animation.export()
				this.getRect('#wyb-popup-content-box').then(res => {
					this.eleW = res.width
					this.eleH = res.height
				})
			},
			contentOut() {
				switch (this.type) {
					case 'center':
						if (this.centerAnim === 'zoom-lessen') {
							this.animation.opacity(0).scale(this.zoomLessenMulti).step()
						} else if (this.centerAnim === 'slide-up') {
							this.animation.opacity(0).translateY(this.rpxToPx(this.height) * this.slideMulti + 'px').step()
						} else if (this.centerAnim === 'slide-down') {
							this.animation.opacity(0).translateY(0 - this.rpxToPx(this.height) * this.slideMulti + 'px').step()
						} else if (this.centerAnim === 'fade') {
							this.animation.opacity(0).step()
						}
						break
					case 'bottom':
						this.animation.translateY(this.eleH).step()
						break
					case 'top':
						this.animation.translateY(0 - this.eleH).step()
						break
					case 'left':
						this.animation.translateX(0 - this.eleW).step()
						break
					case 'right':
						this.animation.translateX(this.eleW).step()
						break
				}
				this.contentAnim = this.animation.export()
			},
			maskIn() {
				this.animation = uni.createAnimation({
					duration: this.duration,
					timingFunction: 'ease'
				})
				this.animation.opacity(1).step()
				this.maskAnim = this.animation.export()
			},
			maskOut() {
				this.animation.opacity(0).step()
				this.maskAnim = this.animation.export()
			},
			rpxToPx(rpx) {
				return rpx / 750 * this.w
			},
			getRect(selector) {
				return new Promise(resolve => {
					uni.createSelectorQuery().in(this)['select'](selector).boundingClientRect(rect => {
						if (rect) {
							resolve(rect)
						}
					}).exec()
				})
			},
			clear(e) {
				e.stopPropagation()
			}
		}
	}
</script>

<style>
	@import "./iconfont.css";
	.wyb-popup-box{
		position: relative;
	}
	
	.wyb-popup-container {
        width: 100%;
		height: 100%;
		position: relative;
	}
	
	.wyb-popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		opacity: 0;
		transform: scale(20);
	}
	
	.wyb-popup-close {
		position: absolute;
		fontSize: 40rpx;
		color: #808080;
		z-index: 20000;
	}
	
	.wyb-popup-custom-close {
		left: 0;
		top: 0;
		position: absolute;
	}
</style>
