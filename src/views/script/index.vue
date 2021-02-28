<template>
	<div class="pb20 pt20 pl20 pr20">
		<div class="like-edit pl20 pr20">
			<div class="clearfix">
				<div class="label pull-left">脚本管理</div>
				<div class="pull-right edit">
					<!-- <el-button @click="" size="small" class="" type="success" icon="el-icon-plus">上传脚本</el-button> -->
					<div class="pub-flex">
						<div class="row-con mr10">
							<el-upload
								class="upload-demo"
								:action="getUpLoadUrl()"
								:before-upload="authFile"
								:headers="getHeaderConf()"
								:show-file-list="false"
								:multiple="false"
								:on-success="uploadSuccess">
								<el-button size="small" style="width: 100%;display: block;" icon="el-icon-upload" type="success">上传脚本</el-button>
							</el-upload>
						</div>
						<el-button @click="pullData" size="small" class="" type="primary" icon="el-icon-refresh">刷新数据</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="table mt20" time="1579161852340">
			<!-- 表格内容 -->
			<el-table
				:data="tableData"
				:height="tabHight"
				v-loading="loading"
				:show-overflow-tooltip="false"
				border
				style="width: 100%">
				<el-table-column
					prop="name"
					label="脚本名称"
					:sortable="true"
					width="650">
					<template slot-scope="scope">
						<span>{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="stateName"
					label="脚本状态"
					:sortable="false"
					:show-overflow-tooltip="true"
					width="80">
				</el-table-column>
				<el-table-column
					prop="timeout"
					label="最大消耗时间"
					:sortable="false"
					:show-overflow-tooltip="true"
					width="110">
					<template slot-scope="scope">
						<span>{{ scope.row.timeout / 60000 }} 分</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="runTime"
					label="最后运行时间"
					:sortable="false"
					:show-overflow-tooltip="true"
					width="160">
					<template slot-scope="scope">
						<span>{{ scope.row.runTime ? scope.row.runTime : '暂无运行记录' }}</span>
					</template>
				</el-table-column>
				<el-table-column>
				</el-table-column>
				<el-table-column
			      	fixed="right"
			      	label="操作"
			      	width="230">
			      	<template slot-scope="scope">
						<div class="text-center">
							<el-tooltip class="item" effect="dark" content="运行" placement="top">
				        		<el-button @click="runScriptEv(scope.row)" size="mini" type="success">
					        		<i class="fa fa-paper-plane" aria-hidden="true"></i>
				        		</el-button>
			        		</el-tooltip>
			        		<el-tooltip class="item" effect="dark" content="编辑" placement="top">
				        		<el-button @click="remindStopDialog(scope.row)" size="mini" type="primary">
					        		<i class="fa fa-stop" aria-hidden="true"></i>
				        		</el-button>
			        		</el-tooltip>
							<el-tooltip class="item" effect="dark" content="编辑" placement="top">
				        		<el-button @click="showEditDialog(scope.row)" size="mini" type="warning">
					        		<i class="fa fa-edit" aria-hidden="true"></i>
				        		</el-button>
			        		</el-tooltip>
		        			<el-tooltip class="item" effect="dark" content="删除" placement="top">
				        		<el-button @click="remindDialog(scope.row.alias)" size="mini" type="danger">
					        		<i class="fa fa-trash" aria-hidden="true"></i>
				        		</el-button>
			        		</el-tooltip>
						</div>
			      	</template>
			    </el-table-column>
			</el-table>
		</div>
		<el-dialog
			title="修改脚本配置文件"
			:visible.sync="editDialog"
			:close-on-click-modal="false"
			:before-close="resetEditInfo"
			width="600px">
			<div class="text-center">
				<div class="pl10 pr10">
					<div>
						<div>
							<el-alert :title="target.note" type="error"></el-alert>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">脚本名称：</label>
							<div class="row-con">
								<div>
									<el-input size="small" v-model="target.name" placeholder="请输入内容"></el-input>
								</div>
							</div>
						</div>
						<div class="row-item clearfix">
							<label class="pull-left" for="">消耗时间：</label>
							<div class="row-con">
								<div>
									<el-input size="small" v-model.number="target.timeout" placeholder="请输入内容"></el-input>
								</div>
								<div>
									<p class="text-left" style="color: #F56C6C;">采集脚本建议输入 <span style="#67C23A">180</span> ，单位（分钟）</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="target.options && JSON.stringify(target.options) !== '{}'" class="tabBox pl10 pr10 pt10 pb20 mt20">
					<span class="tipTitle">附加参数</span>
					<div>
						<div v-for="item in target.options" class="row-item clearfix">
							<label class="pull-left" for="">{{item.key}}：</label>
							<div class="row-con">
								<div class="pub-flex pub-jc-start pub-ai-center">
									<el-input v-if="item.type === 'string'" size="small" v-model="item.val" placeholder="请输入内容"></el-input>
									<el-input v-else-if="item.type === 'number'" size="small" v-model.number="item.val" placeholder="请输入内容"></el-input>
									<div v-else-if="item.type === 'boolean'" style="height: 32px;" class="pub-flex pub-jc-start pub-ai-center">
										<el-switch v-model="item.val" active-color="#13ce66" inactive-color="#dcdfe6"></el-switch>
									</div>
									<el-input v-else-if="item.type === 'textarea'" v-model="item.val" type="textarea" autosize placeholder="请输入内容" ></el-input>
									<div v-else-if="item.type === 'bindType'">
										<el-row :gutter="20">
											<el-col :key="typeItemKey" v-for="(typeItem, typeItemKey) in item.list" :span="12">
												<div class="mb10 clearfix">
													<label class="pull-left" for="">{{typeItemKey}}：</label>
													<div class="row-con">
														<el-select size="small" v-model="item.list[typeItemKey]" placeholder="请选择">
															<el-option v-for="selectItem in restaurants" :key="selectItem._id" :label="selectItem.name" :value="selectItem._id"></el-option>
														</el-select>
													</div>
												</div>
											</el-col>
										</el-row>
									</div>
								</div>
								<div v-if="item.hasOwnProperty('note')" class="text-left">
									<p style="color: #F56C6C;">{{item.note}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" type="primary" @click="updateScriptConf">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { GetScriptList, RunScript, RemoveScript, UploadScript, UpdateScript, StopRunScript } from '@api/script'
	import { GetNavList } from '@api/nav_type'
	import { isDev, catStorage } from '@utils/tools'
	export default {
		data(){
			return {
				target: {
					alias: "",
					name: "",
					note: "",
					timeout: 0,
					options: {}
				},
				editDialog: false,
				//
				tableData: [],
				restaurants: [],
				loading: false,
				tabHight: 0,        // 动态绑定  el-table高度计算
			}
		},
		methods: {
			runScriptEv({ alias, state }){
				if(state){
					this.$message({
						type: 'warning',
						message: '脚本正在运行中，无须再次运行！'
					})
					return
				}
				RunScript({
					alias
				}, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
				})
			},
			uploadSuccess(res, file, fileList){
				let createRes = {'data': {'code': res.code, 'text': res.text}};
				this.ajaxMsgTips(createRes);
				if(createRes.data.code === 200){
					this.pullData(false);
				}
			},
			getHeaderConf(){
				return {
					Token: catStorage('token').value,
				}
			},
			authFile(file){
				let index = file.name.lastIndexOf(".");
				let fileType = file.name.substring(index+1).toLocaleLowerCase();
				if(fileType === 'zip'){
					return true
				}
				this.$message({
					type: 'warning',
					message: '请上传 zip 格式压缩文件！'
				})
				return false
			},
			getUpLoadUrl(){
				let path = UploadScript();
				return isDev() ? `/api${path}` : path
			},
			showEditDialog({ alias, state, name, note, timeout, options={} }){
				if(state){
					this.$message({
						type: 'warning',
						message: '脚本正在运行中，无法编辑配置文件！'
					})
					return
				}
				this.target = {
					alias,
					name,
					note,
					timeout,
					options,
				}
				this.editDialog = true;
			},
			resetEditInfo(done){
				this.target = {
					alias: '',
					name: '',
					note: '',
					timeout: 0,
					options: {},
				}
				if(done && typeof done === 'function'){
					done();
				}
			},
			updateScriptConf(){
				UpdateScript(this.target, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						// 重置
						this.resetEditInfo();
						this.pullData(false);
					}
				})
				.finally(() => {
					this.editDialog = false;
				})
			},
			// 提醒停止
			remindStopDialog(tarAlias){
				this.$confirm('如果脚本运行卡住了，您可以点击停止运行。 是否继续？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.stopRunScriptFn(tarAlias)
		        }).catch(() => { });
			},
			stopRunScriptFn(tarAlias){
				StopRunScript({
					alias: tarAlias.alias
				}, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						this.pullData();
					}
				})
			},
			// 提醒删除
			remindDialog(tarAlias){
				this.$confirm('此操作将永久删除该数据, 是否继续？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.deleteData(tarAlias)
		        }).catch(() => { });
			},
			// 删除
			deleteData(tarAlias){
				RemoveScript({
					alias: tarAlias
				}, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						this.pullData();
					}
				})
			},
			// 动态设置table高度
			getTableHeight(){
				let getObjH = (className) => {
					return document.getElementsByClassName(className)[0]
				}
				let getObjStyleNum = (obj, attr) => {
					return Number(window.getComputedStyle(obj, null)[attr].split('px')[0]);
				}
				let winH = document.body.clientHeight;
				let headerH = getObjH('header-nav').clientHeight;
				let likeObj = getObjH('like-edit');
				let likeEditH = likeObj.clientHeight;
				let cptCon = getObjH('cpt-con');
				let tableObj = getObjH('table');

				this.tabHight = winH - (headerH + 44 + likeEditH + getObjStyleNum(tableObj, 'margin-top') + getObjStyleNum(cptCon, 'padding-top') + getObjStyleNum(cptCon, 'padding-bottom'));
			},
			pullData(loadingState = false){
				this.loading = true;
				GetScriptList({}, {loading: loadingState})
				.then(res => {
					if(res.data.code === 200){
						this.tableData= res.data.value;
					}
				})
				.finally(() => {
					this.loading = false;
				})
			},
			// 拉所有的类型
			pullAllTypes(){
				GetNavList({}, {loading: true})
				.then(res => {
					if(res.data.code === 200){
						let arr = [{_id: "", name: '(空：不绑定)'}];
						for(let arg of res.data.value){
							arr.push({'name': arg.name, '_id': arg._id})
							if(arg.children && arg.children.length){
								for(let arg2 of arg.children){
									arr.push({'name': '┣━' + arg2.name, '_id': arg2._id})
								}
							}
						}
						this.restaurants = arr;
					}
				})
			}
		},
		created(){
			this.pullData(true);
			this.pullAllTypes();
		},
		mounted(){
			this.$nextTick(() => {
				this.getTableHeight();
				window.onresize = this.getTableHeight;
			})
		},
		beforeDestroy(){
			window.onresize = null;
		}
	}
</script>
<style lang="scss" scoped>
	.pr5{
		padding-right: 5px;
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
	.table{
		border: 1px solid #e6e6e6;
		background-color: #fff;
		.filter-cood{
			height: 50px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: row;
			font-size: 14px;
			color: #606266;
			.edit-item-btn{
				display: inline-block;
				color: #777;
				font-size: 13px;
				&:hover{
					color: #3e84e9;
				}
			}
			.division{
				border-right: 1px solid #ccc;
			}
		}
		.page-list{
			height: 40px;
			display: flex;
			justify-content: flex-end;
			flex-direction: row;
			align-items: center;
			width: 100%;
			font-size: 13px;
		}
	}
	.like-edit{
		height: 60px;
		position: relative;
		background: #fff;
		border: 1px solid #e6e6e6;
		.label{
			line-height: 60px;
		}
		.query{
			width: 300px;
			left: 50%;
			top: 50%;
			margin-left: -150px;
			margin-top: -16px;
		}
		.edit{
			margin-top: 16px;
		}
	}
	.row-item{
		margin-top: 20px;
		label{
			width: 80px;
			padding-right: 10px;
			line-height: 32px;
			text-align: right;
		}
		.row-con{
			padding-left: 90px;
			min-height: 32px;
			line-height: 32px;
		}
	}
</style>
<style lang="scss">
	.table[time="1579161852340"]{
		th{
			font-weight: normal;
			color: #666;
		}
	}
</style>