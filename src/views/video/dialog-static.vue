<template>
	<div>
		<el-dialog
			:title="videoTitle"
			:visible.sync="showState"
			:close-on-click-modal="false"
			width="500px">
			<div class="row-item clearfix">
				<label class="pull-left" for="">详情页：</label>
				<div class="row-con">
					<div class="pub-flex" style="height: 32px;justify-content: flex-start;">
						<el-switch v-model="static.detill" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
					</div>
				</div>
			</div>
			<div class="row-item clearfix">
				<label class="pull-left" for="">播放页：</label>
				<div class="row-con">
					<div class="pub-flex" style="height: 32px;justify-content: flex-start;">
						<el-switch v-model="static.player" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
					</div>
				</div>
			</div>
			<div class="row-item clearfix">
				<label class="pull-left" for="">域地址：</label>
				<div class="row-con">
					<div class="pub-flex" style="height: 32px;justify-content: flex-start;">
						<el-input v-model="remoteUrl" size="small" placeholder="请输入内容"></el-input>
					</div>
					<div style="color: #F56C6C;">警告：请在上线后使用静态化</div>
				</div>
			</div>
			<div class="mt20 text-right">
				<el-button @click="saveStatic" size="small" type="success">确认</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { CreateStatic } from '@api/video'
	import { isDev } from '@utils/tools'
	export default {
		data(){
			return {
				_id: '',
				showState: false,
				videoTitle: '',
				remoteUrl: '',
				static: {
					detill: true,
					player: true,
				}
			}
		},
		methods: {
			saveStatic(){
				// 本地不允许执行，必须部署远程
				if(isDev()){
					this.ajaxMsgTips({data: {code: 500, text: '本地不允许执行，必须部署远程'}});
					return
				}

				let strLen = this.remoteUrl.length;
				let newRemoteUrl = this.remoteUrl.charAt(strLen-1) === '/'
					? this.remoteUrl.substring(0, strLen-1)
					: this.remoteUrl;
				CreateStatic({
					_id: this._id,
					remoteUrl: newRemoteUrl,
					detill: this.static.detill,
					player: this.static.player,
				},{loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						this.showState = false;
					}
				})
			}
		},
		watch: {
			'showState'(n, o){
				if(!n){
					this.static = {
						detill: true,
						player: true,
					}
					this.videoTitle = '';
				}
			}
		},
		created(){
			this.$Bus.$off('changeVideoStaticDialog');
			this.$Bus.$on('changeVideoStaticDialog', (conf) => {
				let remote = window.location;
				this.showState = conf.showState;
				this.videoTitle = conf.showState ? conf.videoTitle : '';
				this._id = conf.showState ? conf._id : '';
				this.remoteUrl = remote.protocol + '//' + remote.host;
			})
		}
	}
</script>
<style lang="scss" scoped>
	.row-item{
		margin-top: 20px;
		label{
			width: 100px;
			padding-right: 10px;
			line-height: 32px;
			text-align: right;
		}
		.row-con{
			padding-left: 110px;
			min-height: 32px;
			line-height: 32px;
			>div{
				max-width: 900px;
			}
		}
	}
</style>