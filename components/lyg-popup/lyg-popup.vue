<template name="protocol-popup">
	<view @touchmove.stop.prevent="clear" v-show="showPopup">
		<view class="popup_mask" @touchmove.stop.prevent="clear"></view>
		<view class="popup_content">
			<view class="title">{{title}}</view>
			<view class="explain_text">
				<view>亲爱的用户，感谢您信任并使用圈果！我们依据相关法律法规制定了《用户服务协议》、《隐私政策》和《退换货规则》，请您在同意之前仔细阅读并充分解相关条款，其中的重点条款已为您标注，方便您了解自己的权利。</view>
				<view>我们将通过《隐私政策》向您说明：</view>
				<view>1.向您提供更个性化、更便捷的服务，我们会根据您的授权，收集和使用对应的必要信息（例如您的联系电话、位置信息、配送地址等）。</view>
				<view>2.您可以对以上信息进行访问、修改、删除以及注销账户，我们也将提供专门的个人信息保护联系方式。</view>
				<view>3.未经您的授权同意，我们不会将以上信息共享给第三方或您未授权的其他用途。</view>
			</view>
			<view class="button">
				<view class="disagree">
					<navigator class="close" target="miniProgram" open-type="exit">
					   不同意
					</navigator>
				</view>
				<view class="agree" @tap="confirm">同意并继续</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: "lyg-popup",
		props: {
			title: {
				type: String,
				default: "服务协议和隐私政策"
			},
			// 协议路径
			protocolPath: {
				type: String
			},
			// 政策路径
			policyPath: {
				type: String
			},
			policyStorageKey: {
				type: String,
				default:"has_read_privacy"
			}
		},
		data() {
			return {
				showPopup: false
			};

		},
		created: function() {
			var that = this;
			uni.getStorage({
				key: this.policyStorageKey,
				success: (res) => {
					if (res.data) {
						that.showPopup = false;
						uni.showTabBar({});
					}
				},
				fail: function(e) {
					that.showPopup = true;
					uni.hideTabBar({});
					// console.log(e)
				}
			});
		},
		methods: {
			// 禁止滚动
			clear() {
				return;
			},
			back() {
				this.$emit('popupState', false)
				// #ifdef APP-PLUS  
				plus.runtime.quit();
				// #endif
			},
			// 关闭弹框
			confirm() {
				this.showPopup = false;
				this.$emit('popupState', true);

				uni.setStorage({ 
					key: this.policyStorageKey,
					data: true
				});
				uni.showTabBar({});
			}
		}
	};
</script>

<style lang="scss">
	.popup_mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		z-index: 999;

	}

	.popup_mask {
		opacity: 1;
	}

	.popup_content {
		overflow: hidden;
		box-sizing: border-box;
		// padding: 0upx 40upx;
		position: fixed;
		bottom: 16%;
		border-radius: 8px;
		left: 5%;
		// margin-left: -40%;
		right: 0;
		min-height: 400upx;
		background: #ffffff;
		width: 90%;
		z-index: 999;

		.title {
			text-align: center;
			font-size: 36upx;
			padding: 34upx 0 28upx 0;
			color: #393939;
		}

		.explain_text {
			font-size: 28upx;
			padding: 0 40rpx 40rpx;

			color: #707070;
			line-height: 48rpx;


			.line {
				display: block;

				.path {
					color: #007aff;
					display: inline-block;
					text-align: center;
				}
			}
		}

		.button {
			display: flex;
			padding: 20upx;
			align-items: center;
			font-size: 34upx;
			justify-content: space-around;
			border-top: 1upx solid #f2f2f2;

			view {
				text-align: center;
			}
		}
	}
	
		
	.agree {
		font-size: 32rpx;
		color: #00C52A;
		width: 50%;
	}
	
		
	.disagree {
		color: #b6b6b6;
		font-size: 32rpx;
		width: 50%;
		border-right: 1px solid #f5f5f5;


	}
	
</style>
