<template>
	<view>
		<navbar :isHome="true" />
		<view>
			<view class="weui-cell" style="background: #fff9eb;">
				<view class="weui-cell_hd">
					<image src="../../static/icon/ic_myapp.png" mode=""></image>
				</view>
				<view class="weui-cell_bd">
					<text>点击右上角“添加我的小程序”，方便下次查找!</text>
				</view>
				<view class="weui-cell_ft">
					<image src="../../static/icon/modal_closer.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<!-- 轮播 -->
		<view v-if="slides && slides.length > 0" class="index_swiper">
			<swiper autoplay circular :interval="4000" :duration="500" indicator-dots>
				<block v-for="(item,index) in slides" :key="index">
					<swiper-item>
						<image :src="item.pic_image_url" mode="widthFix" show-menu-by-longpress :data-index="index"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		
		<!-- 快捷入口 -->
		<view class="nav2-list" v-if="nav2s && nav2s.length > 0">
			<block v-for="(item,index) in nav2s" :key="index">
				<view class="nav2-item" :data-index="index" @click="onNav2Tap">
					<view class="nav2-pic">
						<image :src="item.pic_image_url" mode="widthFix"></image>
					</view>
				</view>
			</block>
		</view>
		
		<view class="nav-list" v-if="navs && navs.length > 0">
			<block v-for="(item,index) in navs" :key="index">
				<view class="nav-item" :data-index="index" @click="onNavTap">
					<view class="nav-pic">
						<image :src="item.pic_image_url" mode=""></image>
					</view>
					<view class="nav-text" :style="'color:' + (item.tcolor ? item.tcolor : '')">
						{{item.title}}
					</view>
				</view>
			</block>
		</view>
		
		<view class="weui-cells hosp-list">
			<!-- 医院列表 -->
			<view class="weui-cell  weui-cell_access hosp-item" v-for="(item,index) in hospitals" :key="item.id" :data-hid="item.id" @click="toHospital">
				<view class="weui-cell_hd">
					<image class="hosp-avatar" mode="aspectFill" :src="item.avatar ? item.avatar_url : '../../static/avatar.jpg'"></image>
				</view>
				<view class="weui-cell_bd">
					<view>
						<text class="hosp-name">
							{{item.name}}
						</text>
					</view>
					
					<view class="hosp-line">
						<text class="hosp-rank">{{item.rank}}</text>
						<text class="hosp-label">{{item.label}}</text>
					</view>
					
					<view class="hosp-line">
						<text class="hosp-intro">{{item.intro}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref , reactive, computed, toRaw} from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	const app = getApp()

	// 定义轮播图
	const slides = ref([])
	//快捷入口 
	const nav2s = ref([])
	//快捷入口多个
	const navs = ref([])
	//医院列表
	const hospitals = ref([])
	onLoad(()=> {
		app.globalData.utils.getUserInfo()
		app.globalData.utils.request({
			url:'/app/init',
			success: res => {
				const {id} = res.data.area
				//通过id去获取当前地区的页面数据
				app.globalData.utils.request({
					//地区医院信息
					url:'/Index/index',
					data:{
						aid:id
					},
					success:({data})=>{
						slides.value = data.slides
						nav2s.value = data.nav2s
						navs.value = data.navs
						hospitals.value = data.hospitals
					}
				})
			}
		})
	})
	
	const onNav2Tap = (e) =>{
		const nav = toRaw(nav2s.value)[e.currentTarget.dataset.index]
		jump(nav,'nav2')
	}
	
	const onNavTap = (e) => {
		const nav = toRaw(navs.value)[e.currentTarget.dataset.index]
		jump(nav,'navs')
	}
	
	const jump = (nav,type) => {
		//判断是否为内部链接
		if(nav.stype == 1){
			uni.navigateTo({
				url: nav.stype_link
			})
		}
	}
	
	//跳转到医院列表
	const toHospital = (e) => {
		uni.navigateTo({
			url:'../hospital/index?hid=' + e.currentTarget.dataset.hid
		})
	}
</script>

<style lang="less">
	page{
		background: #fff;
	}
	.weui-cell{
		display: flex;
		justify-content:space-between;
		align-items: center;
		padding: 15rpx 20rpx;
		.weui-cell_hd{
			image{
				display: block;
				width: 40rpx;
				height: 40rpx;
				margin-right: 14rpx;
			}
		}
		.weui-cell_bd{
			color: #be9719;
			font-size: 13px;
		}
		.weui-cell_ft{
			image{
				display: block;
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
	.index_swiper{
		padding: 20rpx 20rpx 0 20rpx;
		overflow: hidden;
		swiper{
			height: 320rpx;
			overflow: hidden;
			border-radius: 10rpx;
			swiper-item{
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.nav2-list{
		display: flex;
		margin: 10rpx 20rpx 0 20rpx;
		.nav2-item{
			margin-top: 20rpx;
			width: 50%;
			padding: 0 5rpx;
			.nav2-pic{
				width: 100%;
				image{
					display: block;
					width: 100%;
				}
			}
		}
	}
	.nav-list{
		display: flex;
		.nav-item{
			margin-top: 20rpx;
			width: 20%;
			text-align: center;
			padding: 10rpx 0;
			.nav-pic{
				image{
					display: block;
					margin: 0 auto;
					width: 110rpx;
					height: 110rpx;
				}
			}
			.nav-text{
				font-size: 24rpx;
				font-weight: bold;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}
	.hosp-list{
		margin: 10rpx 0 0 0;
		background: none;
		::before{
			display: none;
		}
		::after{
			display: none;
		}
		.hosp-item{
			-webkit-box-align: stretch;
			-webkit-align-items: stretch;
			align-items: stretch;
			padding: 20rpx;
			margin: 20rpx;
			border-radius: 10rpx;
			overflow: hidden;
			box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04), 0 1px 6px 0 rgba(0, 0, 0, 0.04);
			::before{
				display: none;
			}
			::after{
				display: none;
			}
			.hosp-avatar{
				display: block;
				width: 200rpx;
				height: 180rpx;
				border-radius: 10rpx;
				overflow: hidden;
				margin-right: 20rpx;
			}
			.hosp-name{
				font-weight: bold;
				font-size: 34rpx;
			}
			
			.hosp-line{
				margin-top: 10rpx;
				text{
					font-size: 26rpx;
				}
				.hosp-rank{
					font-weight: bold;
					color: #0bb585;
					margin-right: 15rpx;
				}
				.hosp-label{
					font-weight: bold;
					color: #0ca7ae;
					margin-right: 15rpx;
				}
				.hosp-intro{
					color: #999;
					overflow: hidden;
					/* text-overflow: ellipsis; */
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
			
		}
	}



</style>
