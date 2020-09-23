<template>
	<div time="1578228809247" class="pb20 pt20 pl20 pr20 config">
		<div class="box">
			<div class="con">
				<div class="pr20 pl20 pt20 pb20 tabBox mt10">
					<span class="tipTitle">网站</span>
					<div>
						<div style="margin: 0;" class="row-item clearfix">
							<label class="pull-left" for="">网站名称：</label>
							<div class="row-con">
								<div>
									<el-input size="small" v-model="config.websiteName" placeholder="请输入内容"></el-input>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">网站关键字：</label>
							<div class="row-con">
								<div>
									<el-input size="small" v-model="config.keywords" placeholder="请输入内容"></el-input>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">网站描述：</label>
							<div class="row-con">
								<div>
									<!-- <el-input size="small" v-model="config.description" placeholder="请输入内容"></el-input> -->
									<el-input
										type="textarea"
										:rows="2"
										placeholder="请输入内容"
										v-model="config.description">
									</el-input>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">底部信息：</label>
							<div class="row-con">
								<div>
									<!-- <el-input size="small" v-model="config.footerInfo" placeholder="请输入内容"></el-input> -->
									<el-input
										type="textarea"
										:rows="3"
										placeholder="请输入内容html"
										v-model="config.footerInfo">
									</el-input>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">网站公告：</label>
							<div class="row-con">
								<div>
									<!-- <el-input size="small" v-model="config.footerInfo" placeholder="请输入内容"></el-input> -->
									<el-input
										type="textarea"
										:rows="3"
										placeholder="网站公告"
										v-model="config.notice">
									</el-input>
								</div>
								<div>
									<p style="color: #F56C6C;">提示：多条公告使用回车换行即可，请注意！</p>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">公共代码：</label>
							<div class="row-con">
								<div>
									<!-- <el-input size="small" v-model="config.footerInfo" placeholder="请输入内容"></el-input> -->
									<el-input
										type="textarea"
										:rows="3"
										placeholder="公共代码"
										v-model="config.publicCode">
									</el-input>
								</div>
								<div>
									<p style="color: #F56C6C;">提示：公共代码指的是：统计js，广告js等等，请注意！</p>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">开启轮播图：</label>
							<div class="row-con">
								<div class="">
									<el-switch
										v-model="config.openSwiper"
										active-color="#13ce66"
										inactive-color="#dcdfe6">
									</el-switch>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">开启纯静态：</label>
							<div class="row-con">
								<div class="pub-flex">
									<el-switch
										v-model="config.openStatic"
										active-color="#13ce66"
										inactive-color="#dcdfe6">
									</el-switch>
									<p class="pl20" style="color: #F56C6C;">开启纯静态之前，请确保已经生成静态页面，请注意！</p>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">开启东八区：</label>
							<div class="row-con">
								<div class="pub-flex">
									<el-switch
										v-model="config.isBjTime"
										active-color="#13ce66"
										inactive-color="#dcdfe6">
									</el-switch>
									<p class="pl20" style="color: #F56C6C;">网站时间更改为东八区北京时间，请注意！</p>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">是否允许留言：</label>
							<div class="row-con">
								<div class="pub-flex">
									<el-switch
										v-model="config.allowReply"
										active-color="#13ce66"
										inactive-color="#dcdfe6">
									</el-switch>
									<p class="pl20" style="color: #F56C6C;">禁用评价后无法留言，请注意！</p>
								</div>
								<div v-if="config.allowReply" class="pub-flex">
									<span>留言间隔时间：</span>
									<div style="width: 100px;">
										<el-input size="small" v-model.number="config.replyInterval" placeholder="留言间隔" />
									</div>
									<span class="pl10">分钟</span>
									<div class="pub-flex1"></div>
								</div>
								<div v-if="config.allowReply" class="pub-flex">
									<span>留言字数限制：</span>
									<div style="width: 100px;">
										<el-input size="small" v-model.number="config.replyTextLen" placeholder="留言最大字数限制" />
									</div>
									<span class="pl10">字数长度</span>
									<div class="pub-flex1"></div>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">留言快速审批：</label>
							<div class="row-con">
								<div class="pub-flex">
									<el-switch
										v-model="config.adoptCheck"
										active-color="#13ce66"
										inactive-color="#dcdfe6">
									</el-switch>
									<p class="pl20" style="color: #F56C6C;">用户留言后，检查匹配是否非法留言，直接允许通过，请注意！</p>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">是否允许注册：</label>
							<div class="row-con">
								<div class="pub-flex">
									<el-switch
										v-model="config.allowRegister"
										active-color="#13ce66"
										inactive-color="#dcdfe6">
									</el-switch>
									<p class="pl20" style="color: #F56C6C;">禁用注册后无法注册新用户，请注意！</p>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">开启/关闭-网站：</label>
							<div class="row-con">
								<div class="pub-flex">
									<el-switch
										v-model="config.shangeWebState"
										active-color="#13ce66"
										inactive-color="#dcdfe6">
									</el-switch>
									<p class="pl20" style="color: #F56C6C;">关闭网站后无法访问，请注意！</p>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">只允许域名访问：</label>
							<div class="row-con">
								<div class="pub-flex">
									<el-switch
										v-model="config.allowDomainAccess"
										active-color="#13ce66"
										inactive-color="#dcdfe6">
									</el-switch>
									<p class="pl20" style="color: #F56C6C;">禁用注册后无法注册新用户，请注意！</p>
								</div>
								<div v-if="config.allowDomainAccess">
									<el-input
										type="textarea"
										:rows="2"
										placeholder="请输入内容"
										v-model="config.allowDomainList">
									</el-input>
									<div>
										<p style="color: #F56C6C;">请输入域名，不包括协议（http | https），多个域名使用英文逗号（,）隔开</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">是否过滤关键词：</label>
							<div class="row-con">
								<div class="pub-flex">
									<el-switch
										v-model="config.filterKeyWord"
										active-color="#13ce66"
										inactive-color="#dcdfe6">
									</el-switch>
									<p class="pl20" style="color: #F56C6C;">用户提交留言后，查找是否含有铭感词汇！</p>
								</div>
								<div v-if="config.filterKeyWord">
									<el-input
										type="textarea"
										:rows="2"
										placeholder="请输入内容"
										v-model="config.KeyWordList">
									</el-input>
									<div>
										<p style="color: #F56C6C;">可以输入正则，关键词，两种。多个用英文逗号（,）隔开</p>
									</div>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">上传网站logo：</label>
							<div class="row-con">
								<el-upload
									class="upload-demo"
									:action="getUpLoadLogoUrl()"
									:before-upload="authFileLogo"
									:headers="getHeaderConf()"
									:show-file-list="false"
									:multiple="false"
									:on-success="uploadSuccess">
									<el-button size="small" style="width: 100%;display: block;" type="success">点击上传网站logo</el-button>
								</el-upload>
							</div>
						</div>
					</div>
				</div>

				<div class="pr20 pl20 pt20 pb20 tabBox mt20">
					<span class="tipTitle">APP</span>
					<div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">开启APP首屏公告：</label>
							<div class="row-con">
								<div class="pub-flex">
									<el-switch
										v-model="config.openAppMainNotice"
										active-color="#13ce66"
										inactive-color="#dcdfe6">
									</el-switch>
									<p class="pl20" style="color: #F56C6C;">如果开启首屏公告，App会弹出公告内容。请注意！</p>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">APP首屏公告：</label>
							<div class="row-con">
								<div>
									<!-- <el-input size="small" v-model="config.footerInfo" placeholder="请输入内容"></el-input> -->
									<el-input
										type="textarea"
										:rows="3"
										placeholder="请输入内容"
										v-model="config.appInitNoticeCon">
									</el-input>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">开启APP升级：</label>
							<div class="row-con">
								<div class="pub-flex">
									<el-switch
										v-model="config.appUpgrade"
										active-color="#13ce66"
										inactive-color="#dcdfe6">
									</el-switch>
									<p class="pl20" style="color: #F56C6C;">如果开启APP升级，请先上传APP安装包，请注意！</p>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">APP最新标识：</label>
							<div class="row-con">
								<div class="pub-flex">
									<div class="pub-flex1">
										<el-input size="small" v-model="config.appUniqueKey" placeholder="请输入内容"></el-input>
									</div>
									<div class="pub-flex" style="width: 95px;justify-content: flex-end;">
										<el-button @click="createAppUUID" size="small" type="success">点击生成</el-button>
									</div>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">APP升级信息：</label>
							<div class="row-con">
								<div>
									<!-- <el-input size="small" v-model="config.footerInfo" placeholder="请输入内容"></el-input> -->
									<el-input
										type="textarea"
										:rows="3"
										placeholder="请输入内容"
										v-model="config.upgradeInfo">
									</el-input>
								</div>
								<div>
									<p style="color: #F56C6C;">提示：多条信息使用回车换行即可，请注意！</p>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">上传APP安装包：</label>
							<div class="row-con">
								<el-upload
									class="upload-demo"
									:action="getUpLoadUrl()"
									:before-upload="authFile"
									:headers="getHeaderConf()"
									:show-file-list="false"
									:multiple="false"
									:on-success="uploadSuccess">
									<el-button size="small" style="width: 100%;display: block;" type="success">点击上传App安装包</el-button>
								</el-upload>
							</div>
						</div>
					</div>
				</div>
				<div class="pr20 pl20">
					<div></div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">提交选择：</label>
							<div class="row-con">
								<el-button @click="savaConfig" size="small" type="primary">提交</el-button>
							</div>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { UploadApp, GetConfig, ExecConfig, UploadWebLogon } from '@api/config'
	import { catStorage, isDev } from '@utils/tools'
	export default {
		data(){
			return {
				config: {
					_id: "",
					websiteName: '',                 // 网站名称
					keywords: "",                    // 关键字
					description: '',                 // 描述信息
					footerInfo: '',                  // 底部信息
					notice: '',                      // 公告
					publicCode: '',                  // 公共js代码
					openStatic: false,               // 开启纯静态
					openSwiper: false,               // 开启轮播图
					isBjTime: true,                  // 东八区
					allowReply: false,               // 允许评价
					replyInterval: 5,                // 评价间隔时间
					replyTextLen: 20,                // 留言字数限制
					adoptCheck: true,                // 允许快速审批
					allowRegister: false,            // 允许注册
					shangeWebState: true,            // 开启关闭网站
					allowDomainAccess: false,        // 只允许域名访问
					allowDomainList: '',             // 允许的域名列表
					filterKeyWord: true,             // 留言信息过滤关键词
					KeyWordList: '',                 // 关键词列表
					curTempPath: '',                 // 当前模板路径
					openAppMainNotice: true,         // 开启/关闭 App首屏公告
					appUpgrade: false,               // 开启app升级接口
					appUniqueKey: '',                // app当前最新的uuid
					upgradeInfo: '',                 // App升级公告
					appInitNoticeCon: '',            // App首屏公告内容
				}
			}
		},
		methods: {
			createAppUUID(){
				var temp_url = URL.createObjectURL(new Blob());
				var uuid = temp_url.toString();
				URL.revokeObjectURL(temp_url);
				this.config.appUniqueKey = uuid.substr(uuid.lastIndexOf("/") + 1);
			},
			savaConfig(){
				let data = Object.assign({}, this.config);
				Reflect.deleteProperty(data, 'curTempPath');
				ExecConfig(data, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
				})
			},
			uploadSuccess(res, file, fileList){
				this.ajaxMsgTips({'data': {'code': res.code, 'text': res.text}});
			},
			authFileLogo(file){
				let index = file.name.lastIndexOf(".");
				let fileType = file.name.substring(index+1).toLocaleLowerCase();
				if(fileType === 'png'){
					return true
				}
				this.$message({
					type: 'warning',
					message: '请上传 png 格式的图片！'
				})
				return false
			},
			authFile(file){
				let index = file.name.lastIndexOf(".");
				let fileType = file.name.substring(index+1).toLocaleLowerCase();
				if(fileType === 'apk'){
					return true
				}
				this.$message({
					type: 'warning',
					message: '请上传 apk 软件包！'
				})
				return false
			},
			getHeaderConf(){
				return {
					Token: catStorage('token').value,
				}
			},
			getUpLoadUrl(){
				let path = UploadApp();
				return isDev() ? `/api${path}` : path
			},
			getUpLoadLogoUrl(){
				let path = UploadWebLogon();
				return isDev() ? `/api${path}` : path
			},
			pullData(){
				GetConfig({}, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						this.config = res.data.value;
					}
				})
			}
		},
		created(){
			this.pullData();
		}
	}
</script>
<style lang="scss" scoped>
	.box{
		border: 1px solid #ddd;
		padding: 20px;
		background: #fff;
	}
	.tabBox{
		position: relative;
		border: 1px solid #3e84e9;
		border-radius: 5px;
		.tipTitle{
			position: absolute;
			padding: 0 10px;
			height: 30px;
			line-height: 30px;
			background-color: #fff;
			color: red;
			left: 30px;
			top: -16px;
			border: 1px solid #3e84e9
		}
	}
	.row-item{
		margin-top: 20px;
		label{
			width: 150px;
			padding-right: 10px;
			line-height: 32px;
			text-align: right;
		}
		.row-con{
			padding-left: 160px;
			min-height: 32px;
			line-height: 32px;
			>div{
				max-width: 900px;
			}
		}
	}
</style>