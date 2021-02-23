<template>
	<div class="header">
		<div class="logo pub-flex">
			<i class="fa fa-home fa-2x"></i>
			<span class="pl10">Dart Cms 内容管理系统</span>
		</div>
		<div class="nav">
			<!-- 撑开 flex：1 -->
		</div>
		<div class="">
			<el-button @click="goWebIndeo" type="text">
				<i style="color: #67C23A;" class="fa fa-chrome pr10" aria-hidden="true"></i>
				<span>前台</span>
			</el-button>
		</div>
		<el-divider direction="vertical"></el-divider>
		<el-dropdown>
			<span class="el-dropdown-link user">
				<i class="fa fa-user-circle-o pr10" aria-hidden="true"></i>
				{{ nickName }} <i class="el-icon-caret-bottom pl10"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>
					<div @click="showState = true">
						<i class="fa fa-user" aria-hidden="true"></i>
						<span>修改资料</span>
					</div>
				</el-dropdown-item>
				<el-dropdown-item>
					<div @click="showState2 = true">
						<i class="fa fa-lock" aria-hidden="true"></i>
						<span>修改密码</span>
					</div>
				</el-dropdown-item>
				<el-dropdown-item>
					<div @click="logoutEvent">
						<i class="fa fa-sign-in" aria-hidden="true"></i>
						<span>注销登录</span>
					</div>
				</el-dropdown-item>
			</el-dropdown-menu>
	    </el-dropdown>
	    <!-- 修改用户资料 -->
	    <el-dialog
			title="修改用户资料"
			:visible.sync="showState"
			:append-to-body="true"
			:close-on-click-modal="false"
			width="400px">
			<div>
				<div class="pub-flex">
					<label class="text-right" style="width: 80px;" for="">昵称：</label>
					<div class="pub-flex1">
						<el-input
							size="small"
							placeholder="请输入内容"
							v-model="newNickName">
						</el-input>
					</div>
				</div>
			</div>
			<div class="pt20 text-right">
				<el-button @click="saveUserInfo" size="small" type="primary">确定</el-button>
			</div>
		</el-dialog>
		<!-- 修改用户密码 -->
	    <el-dialog
			title="修改用户密码"
			:visible.sync="showState2"
			:append-to-body="true"
			:close-on-click-modal="false"
			width="400px">
			<div>
				<div class="pub-flex">
					<label class="text-right" style="width: 80px;" for="">密码：</label>
					<div class="pub-flex1">
						<el-input
							size="small"
							placeholder="请输入内容"
							v-model="newPassWord">
						</el-input>
					</div>
				</div>
			</div>
			<div class="pt20 text-right">
				<el-button @click="savePassWord" size="small" type="primary">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { catStorage, setStorage, removeStorage, removeData } from '@utils/tools'
	import { UpdateUser, ResetMyPassWord } from '@api/user'
	export default {
		data(){
			return {
				showState: false,
				showState2: false,
				nickName: '用户昵称',
				newNickName: '',
				newPassWord: '',
			}
		},
		watch: {
			'showState'(n, o){
				if(n){
					this.newNickName = this.nickName;
				}else{
					this.newNickName = '';
				}
			}
		},
		methods: {
			// 修改密码
			savePassWord(){
				if(!this.newPassWord.trim()){
					this.ajaxMsgTips({data: {code: 500, text: '密码不得为空！'}});
					return
				}
				if(!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.test(this.newPassWord)){
					this.ajaxMsgTips({data: {code: 500, text: '密码长度 4 - 19 之间！'}});
					return
				}
				ResetMyPassWord({
					passWord: this.newPassWord
				})
				.then((res) => {
					this.ajaxMsgTips(res);
				})
				.finally(() => {
					this.showState2 = false;
				})
			},
			// 修改用户信息
			saveUserInfo(){
				if(!this.newNickName.trim()){
					this.ajaxMsgTips({data: {code: 500, text: '昵称不得为空！'}});
					return
				}
				if(this.newNickName.trim().length > 6){
					this.ajaxMsgTips({data: {code: 500, text: '昵称长度应小于6个字符！'}});
					return
				}
				let userInfo = catStorage('userInfo');
				UpdateUser({
					_id: userInfo._id,
					nickName: this.newNickName
				}, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						userInfo['nickName'] = this.newNickName;
						this.nickName = this.newNickName;
						setStorage('userInfo', userInfo);
					}
				})
				.finally(() => {
					this.showState = false;
				})
			},
			// 跳转首页
			goWebIndeo(){
				window.open('/');
			},
			// 修改昵称
			setNickName(){
				let userInfo = catStorage('userInfo')
				this.nickName = userInfo.nickName;
			},
			// 注销
			logoutEvent(){
				this.$message({
		          	message: '注销成功，1秒后重新登录！',
		          	type: 'success'
		        });
				removeData();
				setTimeout(() => {
					window.location.reload();
				}, 1000)
			},
		},
		created(){
			this.setNickName();
		}
	}
</script>
<style lang="scss" scoped>
	.header{
		position: relative;
		z-index: 2;
		height: 100%;
		align-items: center;
	    display: flex;
	    padding: 0 30px;
	    .logo{
	    	height: 40px;
	    	margin-right: 30px;
	    	line-height: 40px;
	    	color: #515356;
	    	font-weight: bold;
	    }
	    .nav{
	    	flex: 1;
	    	height: 100%;
	    	display: flex;
	    	flex-direction: row;
	    	.nav-link{
	    		line-height: 60px;
	    		padding: 0 30px;
	    		display: inline-block;
	    		color: #000;
	    		cursor: pointer;
	    		&:hover{
	    			color: rgb(62, 132, 233)
	    		}

	    	}
    		.active{
    			color: rgb(62, 132, 233)
    		}
	    }
	    .user{
	    	cursor: pointer;
	    	display: flex;
	    	flex-direction: row;
	    	align-items: center;
			.icon{
				height: 32px;
				padding-right: 5px;
			}
			&:hover{
				color: rgb(62, 132, 233);
			}
	    }
	}
</style>