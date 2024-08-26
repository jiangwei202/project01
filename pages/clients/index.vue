<template>
	<view>
		<view class="cell-box" v-for="(item,index) in clients" :key="index">
			<view class="weui-cell" @click="onClientSelected" :data-index="index">
				<view class="weui-cell__bd">
					<view>
						<text style="font-weight: bold;">{{item.name}}</text>
					</view>
					<view>
						<text :class="'sext' + item.sex">{{item.sex == 1 ? '男':'女'}}</text>
						<text style="margin-left: 10rpx;">{{item.age}}周岁</text>
						<text style="margin-left: 10rpx;">{{item.mobile}}</text>
					</view>
				</view>
				<view class="weui-cell__ft">
					<text v-if="act == 'select'" class="box__1">选择</text>
					<text v-else @click="removeClient" :data-id="item.id" class="box__2">移除</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref,reactive,computed,toRaw} from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	const app = getApp()

	//创建页面控制的变量
	const act = ref('')
	//服务对象
	const clients = ref([])

	onLoad((options) => {
		act.value = options.act
		if (options.act == 'select') {
			uni.setNavigationBarTitle({
				title: '请选中服务对象'
			})
		} else {
			uni.setNavigationBarTitle({
				title: '服务对象管理'
			})
		}
		//获取服务对象的信息
		app.globalData.utils.request({
			url: '/User/clients',
			success(res) {
				clients.value = res.data.clients
			}
		})
	})
	//选择服务人员
	const onClientSelected = (e) => {
		if(act == '') return
		const index = e.currentTarget.dataset.index
		const clientsData = clients.value[index]
		//触发全局的自定义事件
		uni.$emit('clientChange',toRaw(clientsData))
		uni.navigateBack()
	}
	//移除服务人员
	const removeClient = () => {}
</script>

<style>
	@import './index.css';
	
	.box__1{
		display: inline-block;
		padding: 15rpx 30rpx;
		border: 1rpx solid #0bb584;
		color: #0bb584;
		font-weight: bold;
		border-radius: 10rpx;
		font-size: 28rpx;
		overflow: hidden;
	}
	.box__2{
		display: inline-block;
		padding: 15rpx 30rpx;
		border: 1rpx solid #eee;
		color: #f13e6d;
		border-radius: 10rpx;
		font-size: 28rpx;
		overflow: hidden;
	}
</style>