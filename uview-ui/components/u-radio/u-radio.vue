<template>
	<view class="u-radio" :style="[radioStyle]">
		<view class="u-radio__icon-wrap" @tap="toggle" :class="[iconClass]" :style="[iconStyle]">
			<u-icon
			    name="checkbox-mark"
			    :size="elIconSize" 
				:color="iconColor"/>
		</view>
		<view class="u-radio__label" @tap="onClickLabel" :style="{
			fontSize: $u.addUnit(labelSize)
		}">
			<slot />
		</view>
	</view>
</template>

<script>
	/**
	 * radio 单选框
	 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio-group使用
	 * @tutorial https://www.uviewui.com/components/radio.html
	 * @property {String Number} icon-size 图标大小，单位rpx（默认24）
	 * @property {String Number} label-size label字体大小，单位rpx（默认28）
	 * @property {String Number} name radio组件的标示符
	 * @property {String} shape 形状，见上方说明（默认circle）
	 * @property {Boolean} disabled 是否禁用（默认false）
	 * @property {Boolean} label-disabled 点击文本是否可以操作radio（默认true）
	 * @property {String} active-color 选中时的颜色，如设置parent的active-color将失效
	 * @event {Function} change 某个radio状态发生变化时触发(选中状态)
	 * @example <u-radio :label-disabled="false">门掩黄昏，无计留春住</u-radio>
	 */
	export default {
		name: "u-radio",
		props: {
			// radio的名称
			name: {
				type: [String, Number],
				default: ''
			},
			// 形状，square为方形，circle为原型
			shape: {
				type: String,
				default: ''
			},
			// 是否禁用
			disabled: {
				type: [String, Boolean],
				default: ''
			},
			// 是否禁止点击提示语选中复选框
			labelDisabled: {
				type: [String, Boolean],
				default: ''
			},
			// 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
			activeColor: {
				type: String,
				default: ''
			},
			// 图标的大小，单位rpx
			iconSize: {
				type: [String, Number],
				default: ''
			},
			// label的字体大小，rpx单位
			labelSize: {
				type: [String, Number],
				default: ''
			},
		},
		data() {
			return {
				parentDisabled: false
			};
		},
		created() {
			// this.parentDisabled = this.parent.disabled;
			// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环应用
			this.parent = this.$u.$parent.call(this, 'u-radio-group');
		},
		computed: {
			// 是否禁用，如果父组件u-raios-group禁用的话，将会忽略子组件的配置
			elDisabled() {
				return this.disabled !== '' ? this.disabled : this.parent ? this.parent.disabled : false;
			},
			// 是否禁用label点击
			elLabelDisabled() {
				return this.labelDisabled !== '' ? this.labelDisabled : this.parent ? this.parent.labelDisabled : false;
			},
			// 组件尺寸，对应size的值，默认值为34rpx
			elSize() {
				return this.size ? this.size : (this.parent ? this.parent.size : 34);
			},
			// 组件的勾选图标的尺寸，默认20
			elIconSize() {
				return this.iconSize ? this.iconSize : (this.parent ? this.parent.iconSize : 20);
			},
			// 组件选中激活时的颜色
			elActiveColor() {
				return this.activeColor ? this.activeColor : (this.parent ? this.parent.activeColor : 'primary');
			},
			// 组件的形状
			elShape() {
				return this.shape ? this.shape : (this.parent ? this.parent.shape : 'circle');
			},
			// 设置radio的状态，要求radio的name等于parent的value时才为选中状态
			iconStyle() {
				let style = {};
				if (this.elActiveColor && this.name == this.parent.value && !this.elDisabled) {
					style.borderColor = this.elActiveColor;
					style.backgroundColor = this.elActiveColor;
				}
				style.width = this.$u.addUnit(this.elSize);
				style.height = this.$u.addUnit(this.elSize);
				return style;
			},
			iconColor() {
				return this.name == this.parent.value ? '#ffffff' : 'transparent';
			},
			iconClass() {
				let classes = [];
				classes.push('u-radio__icon-wrap--' + this.elShape);
				if (this.name == this.parent.value) classes.push('u-radio__icon-wrap--checked');
				if (this.elDisabled) classes.push('u-radio__icon-wrap--disabled');
				if (this.name == this.parent.value && this.elDisabled) classes.push(
					'u-radio__icon-wrap--disabled--checked');
				// 支付宝小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
				return classes.join(' ');
			},
			radioStyle() {
				let style = {};
				if (this.parent.width) {
					style.width = this.parent.width;
					// #ifdef MP
					// 各家小程序因为它们特殊的编译结构，使用float布局
					style.float = 'left';
					// #endif
					// #ifndef MP
					// H5和APP使用flex布局
					style.flex = `0 0 ${this.parent.width}`;
					// #endif
				}
				if (this.parent.wrap) {
					style.width = '100%';
					// #ifndef MP
					// H5和APP使用flex布局，将宽度设置100%，即可自动换行
					style.flex = '0 0 100%';
					// #endif
				}
				return style;
			}
		},
		methods: {
			onClickLabel() {
				if (!this.elLabelDisabled && !this.elDisabled) {
					this.parent.setValue(this.name);
					this.emitEvent();
				}
			},
			toggle() {
				if (!this.elDisabled) {
					this.parent.setValue(this.name);
					this.emitEvent();
				}
			},
			emitEvent() {
				// u-radio的name不等于父组件的v-model的值时(意味着未选中)，才发出事件，避免多次点击触发事件
				this.$emit('change', this.name);
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-radio {
		display: -webkit-flex;
		display: flex;
		align-items: center;
		overflow: hidden;
		user-select: none;
		line-height: 1.8;
		
		&__icon-wrap {
			color: $u-content-color;
			display: flex;
			flex: none;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			width: 42rpx;
			height: 42rpx;
			color: transparent;
			text-align: center;
			transition-property: color, border-color, background-color;
			font-size: 20px;
			border: 1px solid #c8c9cc;
			transition-duration: 0.2s;
			
			&--circle {
				border-radius: 100%;
			}
			
			&--square {
				border-radius: 3px;
			}
			
			&--checked {
				color: #fff;
				background-color: #2979ff;
				border-color: #2979ff;
			}
			
			&--disabled {
				background-color: #ebedf0;
				border-color: #c8c9cc;
			}
			
			&--disabled--checked {
				color: #c8c9cc !important;
			}
		}
		
		&__label {
			word-wrap: break-word;
			margin-left: 10rpx;
			margin-right: 34rpx;
			color: $u-content-color;
			font-size: 30rpx;
			
			&--disabled {
				color: #c8c9cc;
			}
		}
	}
</style>
