<template>
	<div class="l-box">
		<el-card class="box-card login-box pr">
			<div class="margin-auto">
				<div class="text-center pt20">
					<p style="color: #fff;font-size: 20px;font-weight: bold;" class="pb20">DartCms管理系统</p>
				</div>
				<el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px">
					<el-form-item label="用户名" class="white-lebal" prop="account">
					    <el-input @focus="changeState('account', true)" @blur="changeState('account', false)" prefix-icon="el-icon-user" type="text" v-model="form.account"></el-input>
						</el-form-item>
						<el-form-item label="密码" class="white-lebal" prop="password">
					    <el-input @focus="changeState('password', true)" @keyup.enter.native="onSubmit" @blur="changeState('password', false)" prefix-icon="el-icon-lock" type="password" v-model="form.password"></el-input>
			    	</el-form-item>
			    	<el-form-item label="验证码" prop="imgcode">
					    <div class="codeImg-box clearfix">
					    	<div>
					    		<el-input prefix-icon="el-icon-picture-outline" type="text" v-model="form.imgcode"></el-input>
					    	</div>
					    	<div>
					    		<div class="code">
					    			<div>
					    				<img @click="getCodeImg" :src="imgCodeLink" alt="" />
					    			</div>
					    		</div>
					    	</div>
					    </div>
			    	</el-form-item>
					<el-form-item class="text-right">
				    	<el-button :loading="loading" type="success" size="small" @click="onSubmit">
				    		<i  class="fa fa-paper-plane pr5" aria-hidden="true"></i>
				    		<span>登录</span>
			    		</el-button>
				    </el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>
<script>
	import { CreateCodeImg, AdminLogin } from '@/api/login'
	import { authToken, catStorage, setToken, setStorage } from '@utils/tools'
	export default {
		data(){
			return {
				loading: false,
				imgCodeLink: "", // base64
				getTime: '',
				showSelect: false,
				focusObj: {
					account: false,
					password: false
				},
				form:{
					account: '',
					password: '',
					imgcode: ''
				},
				rules: {
					account: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					},{
						min: 4,
						max: 16,
						message: '长度在 4 到 16 个字符',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},{
						min: 4,
						max: 16,
						message: '长度在 4 到 16 个字符',
						trigger: 'blur'
					}],
					imgcode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					},{
						min: 4,
						max: 5,
						message: '长度在 4 个字符',
						trigger: 'blur'
					}]
				}
			}
		},
		computed: {

		},
		methods: {
			changeState(key, bool){
				if(bool){
					this.focusObj[key] = true;
					return
				}
				this.focusObj[key] = false;
			},
			getCodeImg(){
				CreateCodeImg()
				.then(res => {
					if(res.data.code === 200){
						let isExist = JSON.stringify(catStorage('token')) === '{}';
						if(isExist){
							setToken(res.data.value.token);
						}else{
							setToken(true, true);
						}
						this.imgCodeLink = 'data:image/bmp;base64,'+res.data.value.base64;
					}
				})
			},
			onSubmit(){
				if(this.loading){
					return
				}
				this.loading = true;
				AdminLogin({
					userName: this.form.account,
					passWord: this.form.password,
					code: this.form.imgcode,
				})
				.then((res) => {
					this.ajaxMsgTips(res);
					if(res.status === 200 && res.data.code == 200){

						let userInfo = res.data.value;
						// 本地存储
						setStorage('userInfo', userInfo);
						// token
						setToken(true, true);
						// 进入主页
						setTimeout(() => {
							this.$router.push('/main/index');
						}, 10)
					}
					if(res.data.code === 500){
						this.getCodeImg();
					}
				})
				.catch((err) => {
					this.ajaxMsgTips(err);
				})
				.finally(() => {
					this.loading = false;
				})
			},
		},
		created(){
			this.getCodeImg();
		}
	}
</script>
<style lang="scss" scoped>
	.pr5{
		padding-right: 5px;
	}
	.l-box{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-image: linear-gradient(to left top, #8855b1, #338edd);
	}
	.login-box{
		width: 500px;
		height: 370px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -250px;
		margin-top: -185px;
		border-radius: 10px;
		overflow: visible;
		background: rgba(0,0,0,.7);
		.logo{
			height: 30px;
			display: inline-block;
			padding-bottom: 40px;
		}
		.logon-title{
			font-size: 24px;
			line-height: 36px;
			padding: 0 0 20px;
		}
		.margin-auto{
			margin: 20px 50px;
		}
		.panda{
			left: 50%;
			margin-left: -60px;
			top: -75px;
			img{
				width: 120px;
			}
		}
		.codeImg-box{
			.code{
				padding: 0 5px;
			}
			>div{
				width: 50%;
				float: left;
			}
			img{
				max-width: 100%;
				vertical-align: middle;
			}
		}
	}
	.cpy-box{
		.cpy-list{
			height: 100%;
			padding: 10px 0 10px;
			li{
				padding: 10px 20px 0 20px;
				:hover{
					background: #dbe6ff;
				}
				cursor: pointer;
			}
		}
		.cpy-card{
			border: 1px solid #ccc;
			background: rgb(248, 249, 252);
			padding-left: 70px;
			height: 70px;
			.ico-font{
				height: 44px;
				width: 44px;
				border-radius: 22px;
				background: rgb(95, 122, 184);
				text-align: center;
				line-height: 44px;
				color: #fff;
				position: absolute;
				left: 15px;
				top: 50%;
				margin-top: -22px;
			}
			p{
				line-height: 70px;
			}
		}
	}
	.cpy-drawer{
		.el-drawer__header{
			box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
		}
		.el-drawer__body{
			overflow-y: auto;
		}
	}
	.box-card{
		border: none;
		box-shadow: 10px 10px 5px rgba(0,0,0,0.5)
	}
</style>
<style lang="scss">
	.login-box .el-form-item__label{
		color: #fff!important;
	}
	.cpy-drawer .el-drawer__header{
		box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
		padding-bottom: 20px;
		margin-bottom: 0;
	}
	.cpy-drawer .el-drawer__body{
		overflow-y: auto;
	}
</style>
