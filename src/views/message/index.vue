<template>
	<div class="pl20 pr20 pt20 pb20">
		<!-- 搜索块 -->
		<div class="like-edit pl20 pr20">
			<div class="clearfix">
				<div class="label pull-left">留言消息管理</div>
				<div class="query pa">
					<el-input @change="pullData" size="small" placeholder="请输入内容" v-model="searchVal" class="input-with-select">
						<el-select style="width: 90px;" @change="pullData" v-model="searchValType" slot="prepend" placeholder="请选择">
					      	<el-option label="已审批" :value="1"></el-option>
					      	<el-option label="未审批" :value="2"></el-option>
					      	<el-option label="全部" :value="0"></el-option>
					    </el-select>
						<el-button class="pointer" @click="pullData" slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div>
				<div class="pull-right edit">
					<el-button @click="pullData" size="small" class="" type="primary" icon="el-icon-refresh">刷新数据</el-button>
				</div>
			</div>
		</div>
		<div class="table mt20" time="1579185123029">
			<!-- 头部筛选 -->
			<div class="pl20 pr20">
				<div class="filter-cood">
					<!-- 状态2  编辑块 -->
					<div v-show="editBox" class="pr20">
						<div class="in-block division pr20 mr20">
							已选择 <span style="color: #409EFF;">{{ selectLen }}</span> 项
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将永久删除多条数据, 是否继续?', 'deleteData')" class="pointer edit-item-btn mr20">
							<i class="fa fa-trash pr5" aria-hidden="true"></i>
							<span>删除</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量显示多条数据，是否继续?', 'changeState', {display: true})" class="pointer edit-item-btn mr20">
							<i class="fa fa-toggle-on pr5" aria-hidden="true"></i>
							<span>显示</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量隐藏多条数据，是否继续?', 'changeState', {display: false})" class="pointer edit-item-btn mr20">
							<i class="fa fa-toggle-off pr5" aria-hidden="true"></i>
							<span>隐藏</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量审批多条数据，是否继续?', 'changeState', {agree: true})" class="pointer edit-item-btn mr20">
							<i class="fa fa-star pr5" aria-hidden="true"></i>
							<span>审批</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量撤销审批多条数据，是否继续?', 'changeState', {agree: false})" class="pointer edit-item-btn mr20">
							<i class="fa fa-star-o pr5" aria-hidden="true"></i>
							<span>撤销审批</span>
						</div>
					</div>
				</div>
			</div>
			<!-- 表格内容 -->
			<el-table
				:data="tableData"
				:height="tabHight"
				@selection-change="selectionChange"
				v-loading="loading"
				:show-overflow-tooltip="false"
				selection
				border
				style="width: 100%">
				<el-table-column
			      	type="selection"
		      		width="44">
			    </el-table-column>
				<el-table-column
					prop="userName"
					label="留言用户"
					:sortable="true"
					width="200"
					:show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column
					prop="date"
					label="留言时间"
					:sortable="false"
					:show-overflow-tooltip="true"
					width="130">
					<template slot-scope="scope">
						<span>{{dateStringify(scope.row.date)}}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="agree"
					label="是否审批"
					:sortable="false"
					:show-overflow-tooltip="true"
					width="80">
					<template slot-scope="scope">
						<div class="text-center">
							<el-switch
								v-model="scope.row.agree"
								@change="changeVideoState(scope.row._id, $event, 'agree', scope.row)"
								active-color="#13ce66"
								inactive-color="#dcdfe6">
							</el-switch>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="display"
					label="是否显示"
					:sortable="false"
					width="80">
					<template slot-scope="scope">
						<div class="text-center">
							<el-switch
								v-model="scope.row.display"
								@change="changeVideoState(scope.row._id, $event, 'display', scope.row)"
								active-color="#13ce66"
								inactive-color="#dcdfe6">
							</el-switch>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="text"
					label="留言内容"
					:sortable="true"
					width="600"
					:show-overflow-tooltip="false">
				</el-table-column>
				<el-table-column>
				</el-table-column>
				<el-table-column
			      	fixed="right"
			      	label="操作"
			      	width="180">
			      	<template slot-scope="scope">
						<div class="text-center">
							<el-button @click="showReplyDialog(scope.row)" size="mini" type="success">
				        		<i class="fa fa-pencil pr5" aria-hidden="true"></i>
				        		<span class="">回复</span>
			        		</el-button>
			        		<el-button @click="remindDialog([scope.row], '此操作将永久删除该数据, 是否继续?', 'deleteData')" size="mini" type="danger">
				        		<i class="fa fa-trash pr5" aria-hidden="true"></i>
				        		<span class="">删除</span>
			        		</el-button>
						</div>
			      	</template>
			    </el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="page-list">
				<div class="pr20">
					<el-pagination
						class="pr20"
				      	@size-change="changePageLen"
				      	@current-change="pullNewPageData"
				      	:current-page="curPageNum"
				      	:page-sizes="[15, 30, 60, 100]"
				      	:page-size="curPageLen"
				      	layout="total, sizes, prev, pager, next, jumper"
				      	:total="pageTotal">
				    </el-pagination>
			    </div>
			</div>
		</div>
		<!-- 留言 -->
		<dialog-reply @success="pullData" />
	</div>
</template>
<script>
	import DialogReply from './dialog-reply.vue'
	// api
	import { GetMessageList, RemoveMessage, ChangeMsgState, ReplyMessage } from '@api/message'
	export default {
		components: {
			DialogReply,
		},
		data(){
			return {
				loading: true,
				//
				editBox: false,
				searchVal: '',      // 搜索框内容
				searchValType: 0,   // 搜索类型
				curSelectItem: [],  // 当前选中的行
				selectLen: 0,       // 当前选中的个数
				//
				tableData: [],
				tabHight: 0,        // 动态绑定  el-table高度计算
				pageTotal: 0,       // 总数据条数
				curPageNum: 1,      // 当前第几页
				curPageLen: 15,     // 默认每页多少条数据
				//
			}
		},
		watch: {
			'replyDialog'(n, o){
				if(!n){
					this.target = {
						_id: '',
						text: ''
					}
				}
			}
		},
		methods: {
			showReplyDialog(row){
				let data = {
					showState: true,
					vid: row.vid,
					wid: row.uid,
					pid: (row.pid && row.pid.length === 24) ? row.pid : row._id,
					text: row.text,
					videoTitle: row.video_title,
				}
				this.$Bus.$emit('changeMessageReplyDialog', data);
			},
			dateStringify(o){
				let n = new Date().getTime();
			    let f = n - o;
			    let bs = (f >= 0 ? '前' : '后');//判断时间点是在当前时间的 之前 还是 之后
			    f = Math.abs(f);
			    if( f < 6e4 ){ return '刚刚' }//小于60秒,刚刚
			    if( f < 36e5 ){ return parseInt(f/6e4)+' 分钟'+bs }//小于1小时,按分钟
			    if( f < 864e5 ){ return parseInt(f/36e5)+' 小时'+bs }//小于1天按小时
			    if( f < 2592e6 ){ return parseInt(f/864e5)+' 天'+bs }//小于1个月(30天),按天数
			    if( f < 31536e6 ){ return parseInt(f/2592e6)+' 个月'+bs }//小于1年(365天),按月数
			    return parseInt( f / 31536e6 ) + ' 年' + bs;//大于365天,按年算
			},
			// 关闭重置dialog数据
			resetEditInfo(done){
				this.target = {
					userName: "",
					passWord: "",
					nickName: "",
					admin: false,
					display: true,
					roleData: {}
				};
				if(done && typeof done === 'function'){
					done();
				}
			},
			// 提醒
			remindDialog(arr, remindText, fnName, conf){
				this.$confirm(remindText, '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this[fnName](arr, conf);
		        }).catch(() => { });
			},
			// 改变状态
			changeState(arr, conf){
				let params = arr.createObjIdArr();
				ChangeMsgState({
					list: params,
					info: conf || {}
				}, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						this.pullData({loading: false, msgTip: false})
					}
				})
			},
			// 删除
			deleteData(arr){
				let params = arr.createObjIdArr();
				RemoveMessage({
					list: params
				}, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						this.pullData({loading: false, msgTip: false});
					}
				})
			},
			// 改变属性
			changeVideoState(_id, ev, key, row){
				let obj = {};
				obj[key] = ev;
				ChangeMsgState({'info': obj, 'list': [_id]}, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					row[key] = res.data.code === 200 ? ev : !ev;
					this.pullData({loading: false, msgTip: false});
				})
			},
			// 搜索
			searchData(){
				this.editBox = false,
				this.curSelectItem = [],  // 当前选中的行
				this.selectLen = 0,       // 当前选中的个数
				//
				this.tableData = [],
				this.pageTotal = 0,       // 总数据条数
				this.curPageNum = 1,      // 当前第几页
				this.curPageLen = 15      // 默认每页多少条数据
				this.pullData({loading: false, msgTip: false});
			},
			// 选项发生变化
			selectionChange(e){
				// 设置已选多少个
				this.selectLen = e.length;
				// 存当前选中的元素
				this.curSelectItem = e;
				if(e.length){
					this.editBox = true;
				}else{
					this.editBox = false;
				}
			},
			// 切换页码
			pullNewPageData(e){
				this.curPageNum = e;
				this.pullData({loading: false, msgTip: false});
			},
			// 切换每页的条数
			changePageLen(e){
				// 设置每页的条数
				this.curPageLen = e;
				// 重设当前页1
				this.curPageNum = 1;
				// 重新啦数据
				this.pullData({loading: false, msgTip: false});
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
				let filterCoodH = getObjH('filter-cood').clientHeight;
				let pageListH = getObjH('page-list').clientHeight;
				let cptCon = getObjH('cpt-con');
				let tableObj = getObjH('table');

				this.tabHight = winH - (headerH + 44 + likeEditH + pageListH + filterCoodH + getObjStyleNum(tableObj, 'margin-top') + getObjStyleNum(cptCon, 'padding-top') + getObjStyleNum(cptCon, 'padding-bottom'));
			},
			// 获取列表数据
			pullData({loading=false, msgTip=false}){
				this.loading = true;
				let query = {
					page: this.curPageNum,
					limit: this.curPageLen
				}
				if(this.searchVal){
					query.search = this.searchVal;
				}
				if(this.searchValType){
					query.match = {
						agree: this.searchValType === 1 ? true : false
					}
				}
				GetMessageList(query, {loading})
				.then(res => {
					if(msgTip){
						this.ajaxMsgTips(res);
					}
					if(res.data.code === 200){
						let v = res.data.value;
						this.tableData = v.result;
						this.pageTotal = v.total;
					}
				})
				.finally(() => {
					this.loading = false;
				})
			}
		},
		created(){
			this.pullData({loading: false, msgTip: true});
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
			width: 75px;
			padding-right: 10px;
			line-height: 32px;
			text-align: right;
		}
		.row-con{
			padding-left: 85px;
			min-height: 32px;
			line-height: 32px;
		}
	}
</style>
<style lang="scss">
	.table[time="1579185123029"]{
		th{
			font-weight: normal;
			color: #666;
		}
	}
</style>