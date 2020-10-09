<template>
	<div class="pb20 pt20 pl20 pr20">
		<div class="like-edit pl20 pr20">
			<div class="clearfix">
				<div class="label pull-left">脚本管理</div>
				<div class="pull-right edit">
					<!-- <el-button @click="" size="small" class="" type="success" icon="el-icon-plus">上传脚本</el-button> -->
					<div class="pub-flex">
						<el-button @click="editDialog = true" size="small" class="" type="success" icon="el-icon-plus">新建任务</el-button>
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
					label="任务名称"
					:sortable="true"
					width="350">
					<template slot-scope="scope">
						<span>{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="script"
					label="脚本目录"
					:sortable="false"
					:show-overflow-tooltip="true"
					width="300">
				</el-table-column>
				<el-table-column
					prop="time"
					label="脚本时间（秒 - 分 - 时 - 日 - 月 - 周）"
					:sortable="false"
					:show-overflow-tooltip="true"
					width="600">
				</el-table-column>
				<el-table-column>
				</el-table-column>
				<el-table-column
			      	fixed="right"
			      	label="操作"
			      	width="90">
			      	<template slot-scope="scope">
						<div class="text-center">
		        			<el-tooltip class="item" effect="dark" content="删除" placement="top">
				        		<el-button @click="remindDialog(scope.row.id)" size="mini" type="danger">
					        		<i class="fa fa-trash" aria-hidden="true"></i>
					        		<span>删除</span>
				        		</el-button>
			        		</el-tooltip>
						</div>
			      	</template>
			    </el-table-column>
			</el-table>
		</div>
		<el-dialog
			title="新建计划任务"
			:visible.sync="editDialog"
			:close-on-click-modal="false"
			:before-close="resetEditInfo"
			width="700px">
			<div class="text-center">
				<div class="row-item clearfix">
					<label class="pull-left" for="">任务名称：</label>
					<div class="row-con">
						<div>
							<el-input size="small" v-model="target.name" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">脚本目录：</label>
					<div class="row-con">
						<div class="text-left">
							<el-select size="small" v-model="target.script" placeholder="脚本名称">
								<el-option
								v-for="item in scriptList"
								:key="item.alias"
								:label="item.alias"
								:value="item.alias">
								</el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">执行周期：</label>
					<div class="pub-flex pub-jc-start">
						<div>
							<el-select size="small" v-model="selectVal.year" placeholder="月">
								<el-option
								v-for="item in cronYear"
								:key="item.v"
								:label="item.l"
								:value="item.v">
								</el-option>
							</el-select>
						</div>
						<div class="ml10">
							<el-select size="small" v-model="selectVal.week" placeholder="周">
								<el-option
								v-for="item in cronWeek"
								:key="item.v"
								:label="item.l"
								:value="item.v">
								</el-option>
							</el-select>
						</div>
						<div class="ml10">
							<el-select size="small" v-model="selectVal.day" placeholder="日">
								<el-option
								v-for="item in cronDay"
								:key="item.v"
								:label="item.l"
								:value="item.v">
								</el-option>
							</el-select>
						</div>
						<div class="ml10">
							<el-select size="small" v-model="selectVal.time" placeholder="时">
								<el-option
								v-for="item in cronTime"
								:key="item.v"
								:label="item.l"
								:value="item.v">
								</el-option>
							</el-select>
						</div>
						<div class="ml10">
							<el-select size="small" v-model="selectVal.min" placeholder="分">
								<el-option
								v-for="item in cronMin"
								:key="item.v"
								:label="item.l"
								:value="item.v">
								</el-option>
							</el-select>
						</div>
						<div class="ml10">
							<el-select size="small" v-model="selectVal.sec" placeholder="秒">
								<el-option
								v-for="item in cronSec"
								:key="item.v"
								:label="item.l"
								:value="item.v">
								</el-option>
							</el-select>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" type="primary" @click="saveNewCron">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { createCron, removeCron, getAllCrons } from '@api/cron'
	import { GetScriptList } from '@api/script'
	export default {
		data(){
			return {
				selectVal: {
					sec: '1',    // 秒
					min: '1',    // 分
					time: '*',   // 时
					day: '*',    // 日
					year: '*',   // 月
					week: '*',   // 周
				},
				// 月
				cronYear: [
					{v: '*', l: '每月'},
					{v: '1', l: '1月'},
					{v: '2', l: '2月'},
					{v: '3', l: '3月'},
					{v: '4', l: '4月'},
					{v: '5', l: '5月'},
					{v: '6', l: '6月'},
					{v: '7', l: '7月'},
					{v: '8', l: '8月'},
					{v: '9', l: '9月'},
					{v: '10', l: '10月'},
					{v: '11', l: '11月'},
					{v: '12', l: '12月'},
				],
				// 周
				cronWeek: [
					{v: '*', l: '每周'},
					{v: '0', l: '周一'},
					{v: '1', l: '周二'},
					{v: '2', l: '周三'},
					{v: '3', l: '周四'},
					{v: '4', l: '周五'},
					{v: '5', l: '周六'},
					{v: '6', l: '周日'},
				],
				// 日
				cronDay: [
					{ v: '*', l: '每天' },
					{ v: '1', l: '1日' },
					{ v: '2', l: '2日' },
					{ v: '3', l: '3日' },
					{ v: '4', l: '4日' },
					{ v: '5', l: '5日' },
					{ v: '6', l: '6日' },
					{ v: '7', l: '7日' },
					{ v: '8', l: '8日' },
					{ v: '9', l: '9日' },
					{ v: '10', l: '10日' },
					{ v: '11', l: '11日' },
					{ v: '12', l: '12日' },
					{ v: '13', l: '13日' },
					{ v: '14', l: '14日' },
					{ v: '15', l: '15日' },
					{ v: '16', l: '16日' },
					{ v: '17', l: '17日' },
					{ v: '18', l: '18日' },
					{ v: '19', l: '19日' },
					{ v: '20', l: '20日' },
					{ v: '21', l: '21日' },
					{ v: '22', l: '22日' },
					{ v: '23', l: '23日' },
					{ v: '24', l: '24日' },
					{ v: '25', l: '25日' },
					{ v: '26', l: '26日' },
					{ v: '27', l: '27日' },
					{ v: '28', l: '28日' },
					{ v: '29', l: '29日' },
					{ v: '30', l: '30日' },
					{ v: '31', l: '31日' },
				],
				// 时
				cronTime: [
					{v: '*', l: '每小时'},
					{v: '0', l: '0点'},
					{v: '1', l: '1点'},
					{v: '2', l: '2点'},
					{v: '3', l: '3点'},
					{v: '4', l: '4点'},
					{v: '5', l: '5点'},
					{v: '6', l: '6点'},
					{v: '7', l: '7点'},
					{v: '8', l: '8点'},
					{v: '9', l: '9点'},
					{v: '10', l: '10点'},
					{v: '11', l: '11点'},
					{v: '12', l: '12点'},
					{v: '13', l: '13点'},
					{v: '14', l: '14点'},
					{v: '15', l: '15点'},
					{v: '16', l: '16点'},
					{v: '17', l: '17点'},
					{v: '18', l: '18点'},
					{v: '19', l: '19点'},
					{v: '20', l: '20点'},
					{v: '21', l: '21点'},
					{v: '22', l: '22点'},
					{v: '23', l: '23点'},
				],
				// 分
				cronMin: [
					{ v: '1', l: '1分' },
					{ v: '2', l: '2分' },
					{ v: '3', l: '3分' },
					{ v: '4', l: '4分' },
					{ v: '5', l: '5分' },
					{ v: '6', l: '6分' },
					{ v: '7', l: '7分' },
					{ v: '8', l: '8分' },
					{ v: '9', l: '9分' },
					{ v: '10', l: '10分' },
					{ v: '11', l: '11分' },
					{ v: '12', l: '12分' },
					{ v: '13', l: '13分' },
					{ v: '14', l: '14分' },
					{ v: '15', l: '15分' },
					{ v: '16', l: '16分' },
					{ v: '17', l: '17分' },
					{ v: '18', l: '18分' },
					{ v: '19', l: '19分' },
					{ v: '20', l: '20分' },
					{ v: '21', l: '21分' },
					{ v: '22', l: '22分' },
					{ v: '23', l: '23分' },
					{ v: '24', l: '24分' },
					{ v: '25', l: '25分' },
					{ v: '26', l: '26分' },
					{ v: '27', l: '27分' },
					{ v: '28', l: '28分' },
					{ v: '29', l: '29分' },
					{ v: '30', l: '30分' },
					{ v: '31', l: '31分' },
					{ v: '32', l: '32分' },
					{ v: '33', l: '33分' },
					{ v: '34', l: '34分' },
					{ v: '35', l: '35分' },
					{ v: '36', l: '36分' },
					{ v: '37', l: '37分' },
					{ v: '38', l: '38分' },
					{ v: '39', l: '39分' },
					{ v: '40', l: '40分' },
					{ v: '41', l: '41分' },
					{ v: '42', l: '42分' },
					{ v: '43', l: '43分' },
					{ v: '44', l: '44分' },
					{ v: '45', l: '45分' },
					{ v: '46', l: '46分' },
					{ v: '47', l: '47分' },
					{ v: '48', l: '48分' },
					{ v: '49', l: '49分' },
					{ v: '50', l: '50分' },
					{ v: '51', l: '51分' },
					{ v: '52', l: '52分' },
					{ v: '53', l: '53分' },
					{ v: '54', l: '54分' },
					{ v: '55', l: '55分' },
					{ v: '56', l: '56分' },
					{ v: '57', l: '57分' },
					{ v: '58', l: '58分' },
					{ v: '59', l: '59分' },
				],
				// 秒
				cronSec: [
					{ v: '1', l: '1秒' },
					{ v: '2', l: '2秒' },
					{ v: '3', l: '3秒' },
					{ v: '4', l: '4秒' },
					{ v: '5', l: '5秒' },
					{ v: '6', l: '6秒' },
					{ v: '7', l: '7秒' },
					{ v: '8', l: '8秒' },
					{ v: '9', l: '9秒' },
					{ v: '10', l: '10秒' },
					{ v: '11', l: '11秒' },
					{ v: '12', l: '12秒' },
					{ v: '13', l: '13秒' },
					{ v: '14', l: '14秒' },
					{ v: '15', l: '15秒' },
					{ v: '16', l: '16秒' },
					{ v: '17', l: '17秒' },
					{ v: '18', l: '18秒' },
					{ v: '19', l: '19秒' },
					{ v: '20', l: '20秒' },
					{ v: '21', l: '21秒' },
					{ v: '22', l: '22秒' },
					{ v: '23', l: '23秒' },
					{ v: '24', l: '24秒' },
					{ v: '25', l: '25秒' },
					{ v: '26', l: '26秒' },
					{ v: '27', l: '27秒' },
					{ v: '28', l: '28秒' },
					{ v: '29', l: '29秒' },
					{ v: '30', l: '30秒' },
					{ v: '31', l: '31秒' },
					{ v: '32', l: '32秒' },
					{ v: '33', l: '33秒' },
					{ v: '34', l: '34秒' },
					{ v: '35', l: '35秒' },
					{ v: '36', l: '36秒' },
					{ v: '37', l: '37秒' },
					{ v: '38', l: '38秒' },
					{ v: '39', l: '39秒' },
					{ v: '40', l: '40秒' },
					{ v: '41', l: '41秒' },
					{ v: '42', l: '42秒' },
					{ v: '43', l: '43秒' },
					{ v: '44', l: '44秒' },
					{ v: '45', l: '45秒' },
					{ v: '46', l: '46秒' },
					{ v: '47', l: '47秒' },
					{ v: '48', l: '48秒' },
					{ v: '49', l: '49秒' },
					{ v: '50', l: '50秒' },
					{ v: '51', l: '51秒' },
					{ v: '52', l: '52秒' },
					{ v: '53', l: '53秒' },
					{ v: '54', l: '54秒' },
					{ v: '55', l: '55秒' },
					{ v: '56', l: '56秒' },
					{ v: '57', l: '57秒' },
					{ v: '58', l: '58秒' },
					{ v: '59', l: '59秒' },
				],
				target: {
					name: "",
					script: ""
				},
				scriptList: [],
				editDialog: false,
				//
				tableData: [],
				loading: false,
				tabHight: 0,        // 动态绑定  el-table高度计算
			}
		},
		methods: {
			saveNewCron(){
				if(!this.target.name.trim()){
					this.ajaxMsgTips({data: {code: 500, text: '名称不得为空！'}});
					return
				}
				if(!this.target.script.trim()){
					this.ajaxMsgTips({data: {code: 500, text: '脚本名不得为空！'}});
					return
				}
				this.editDialog = false;
				let v = this.selectVal;
				let time = `${v.sec} ${v.min} ${v.time} ${v.day} ${v.year} ${v.week}`;
				createCron({
					type: 'createCron',
					time: time,
					name: this.target.name,
					script: this.target.script,
					clientTime: new Date().getTime()
				}, {loading: true})
				.then((res) => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						this.resetEditInfo();
						this.pullData();
					}
				})
				.finally(() => {
					this.editDialog = false;
				})
			},
			resetEditInfo(done){
				this.target = {
					name: "",
					script: "",
				}
				this.selectVal = {
					sec: '1',
					min: '1',
					time: '*',
					day: '*',
					year: '*',
					week: '*',
				}
				if(done && typeof done === 'function'){
					done();
				}
			},
			// 提醒删除
			remindDialog(id){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.deleteData(id)
		        }).catch(() => { });
			},
			// 删除
			deleteData(id){
				removeCron({
					id
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
				getAllCrons({}, {loading: loadingState})
				.then(res => {
					if(res.data.code === 200){
						this.tableData= res.data.value;
					}
				})
				.finally(() => {
					this.loading = false;
				});
				GetScriptList()
				.then(res => {
					this.scriptList = res.data.value;
				})
			}
		},
		created(){
			this.pullData(true);
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