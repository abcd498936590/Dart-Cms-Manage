<template>
	<div time="1579321296360" class="pl20 pr20 pb20 pt20">
		<div class="like-edit pl20 pr20">
			<div class="clearfix">
				<div class="label pull-left">导航分类管理</div>
				<div class="pull-right edit">
					<el-button @click="savaNavSort" size="small" class="" type="warning" icon="el-icon-finished">更新排序</el-button>
					<el-button @click="showDialog" size="small" class="" type="success" icon="el-icon-plus">新增分类</el-button>
					<el-button @click="pullData" size="small" class="" type="primary" icon="el-icon-refresh">刷新数据</el-button>
				</div>
			</div>
		</div>
		<div class="mt20 nav-box ov-y-a" :style="{'height': tabHight}">
			<div class="pl20 pr20 pb20 pt20">
				<div>
					<el-tree
						:data="treeData"
						:default-expand-all="true"
						:props="defaultProps">
						<div class="custom-tree-node lin28" slot-scope="{node, data}">
	        				<div class="clearfix lin28">
		        				<span class="">{{ node.label }}</span>
		        				<div class="pull-right btns-pos">
		        					<div class="pull-right">
			        					<el-button @click.stop="function(){}" style="color: #67C23A;" v-if="data.display" type="text" size="mini">
			        						<i class="fa fa-check ico-fa" aria-hidden="true"></i>
			        					</el-button>
			          					<el-button @click.stop="function(){}" style="color: #F56C6C;" v-else type="text" size="mini">
			          						<i class="fa fa-times ico-fa" aria-hidden="true"></i>
			          					</el-button>
			          					<el-button class="ico-btn" type="text" size="mini" @click.stop="showEditDialog(data)">
			          						<i class="fa fa-pencil ico-fa" aria-hidden="true"></i>
			          					</el-button>
			          					<el-button class="ico-btn" type="text" size="mini" @click.stop="remindDialog(data)">
			          						<i class="fa fa-trash ico-fa" aria-hidden="true"></i>
			          					</el-button>
		        					</div>
	        						<div class="pull-right pr20">
	        							<el-button @click.stop="moveCurTypePos(true, node, data)" class="ico-btn" type="text" size="mini">
	        								<i class="fa fa-arrow-up" aria-hidden="true"></i>
	        							</el-button>
	        							<el-button @click.stop="moveCurTypePos(false, node, data)" class="ico-btn" type="text" size="mini">
	        								<i class="fa fa-arrow-down" aria-hidden="true"></i>
	        							</el-button>
	        						</div>
		        				</div>
	        				</div>
	      				</div>
					</el-tree>
				</div>
			</div>
		</div>
		<!-- 新增编辑 -->
		<el-dialog
			:title="(isEdit ? '修改' : '添加') + '导航分类'"
			:visible.sync="editDialog"
			:close-on-click-modal="false"
			:before-close="resetEditInfo"
			width="600px">
			<div class="">
				<div class="row-item clearfix">
					<label class="pull-left label" for="">分类名称：</label>
					<div class="row-con">
						<div>
							<el-input size="small" v-model="target.name" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div v-show="isShowEditType" class="row-item clearfix">
					<label class="pull-left label" for="">分级分类：</label>
					<div class="row-con">
						<div>
							<el-select @change="changeNavType" style="width: 100%;" size="small" v-model="target.parent_id" placeholder="请选择">
								<el-option
									v-for="item in curNavType"
									:key="item._id"
									:label="item.name"
									:value="item._id">
								</el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left label" for="">是否显示：</label>
					<div class="row-con">
						<div class="pub-flex" style="height: 32px; line-height: 32px;">
							<el-switch
								v-model="target.display"
								active-color="#13ce66"
								inactive-color="#dcdfe6">
							</el-switch>
						</div>
					</div>
				</div>
				<div v-show="isShowEditType" class="row-item clearfix">
					<label class="pull-left label" for="">导航类型：</label>
					<div class="row-con">
						<div class="pub-flex" style="height: 32px; line-height: 32px;">
  							<el-radio-group @change="changeCurSelectTypeList" v-model="target.nav_type">
								<el-radio label="video">视频</el-radio>
  								<el-radio label="article">文章</el-radio>
  							</el-radio-group>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left label" for="">SEO标题：</label>
					<div class="row-con">
						<div>
							<el-input size="small" v-model="target.seo.title" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left label" for="">SEO关键字：</label>
					<div class="row-con">
						<div>
							<!-- <el-input size="small" v-model="target.seo.keywords" placeholder="请输入内容"></el-input> -->
							<el-input
								size="small"
								type="textarea"
								:autosize="{ minRows: 2, maxRows: 4}"
								placeholder="请输入内容"
								v-model="target.seo.keywords">
							</el-input>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left label" for="">SEO描述：</label>
					<div class="row-con">
						<div>
							<!-- <el-input size="small" v-model="target.seo.description" placeholder="请输入内容"></el-input> -->
							<el-input
								size="small"
								type="textarea"
								:autosize="{ minRows: 3, maxRows: 4}"
								placeholder="请输入内容"
								v-model="target.seo.description">
							</el-input>
						</div>
					</div>
				</div>
			</div>
			<div class="pt20 text-right">
				<el-button @click="saveData" size="small" type="primary">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { GetNavList, UpdateNav, RemoveNav, AddNav, NavSort } from '@api/nav_type'
	export default {
		data(){
			return {
				tabHight: '0px',
				treeData: [],
				defaultProps: {
          			children: 'children',
          			label: 'name',
        		},
        		isEdit: false,
        		editDialog: false,
        		// 当前类型 对应的 选择器
        		curNavType: [],
        		allNavType: [],
        		allNavJson: {},
        		//
        		isShowEditType: false,
        		//
        		target: {
        			name: '',
        			parent_id: false,
        			display: true,
        			nav_type: 'video',
        			seo: {
        				title: '',
        				keywords: '',
        				description: '',
        			}
        		}
			}
		},
		methods: {
			changeCurSelectTypeList(label = false){
				// 清空已选择父节点的ID
				this.target.parent_id = false;
				// 加工 导航类型对应的 分类选择器
				let copyTypeList = this.allNavType.filter((item) => {
					// label存在 更改 ，不存在则是新建时候，有延迟造成必须再次处理
					if(label && label === item.nav_type){
						return {
							_id: item._id,
							name: item.name
						}
					}
					if(item.nav_type === this.target.nav_type){
						return {
							_id: item._id,
							name: item.name
						}
					}
				});
				this.curNavType = [{_id: false, name: '顶级分类'}].concat(copyTypeList);
			},
			showDialog(){
				this.changeCurSelectTypeList();
				this.isShowEditType = true;
				this.editDialog = true;
			},
			changeNavType(tar){
				if(tar){
					this.target.nav_type = this.allNavJson[tar];
				}
			},
			savaNavSort(){
				let list = [];
				for(let arg of this.treeData){
					list.push({
						_id: arg._id,
						index: arg.z_index,
					})
					if(arg.children && arg.children.length){
						for(let arg2 of arg.children){
							list.push({
								_id: arg2._id,
								index: arg2.z_index,
							})
						}
					}
				}
				NavSort({list}, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						this.pullData(false, false);
					}
				})
			},
			// 上下移动
			moveCurTypePos(bool, node, data){
				let arr = []
				// 上
				if(bool){
					// 向上，最顶一个
					if(data.z_index === 0){
						return
					}
					// 没有到头
					// 子
					if(data.parent_id && data.parent_id.length === 24){
						let prevEl = this.treeData[data.parent_index].children[data.z_index - 1];
						let curEl = data;
						this.$set(this.treeData[data.parent_index].children, data.z_index - 1, curEl);
						this.$set(this.treeData[data.parent_index].children, data.z_index, prevEl);
					}else{ // 父
						let prevEl = this.treeData[data.z_index - 1];
						let curEl = data;
						this.$set(this.treeData, data.z_index - 1, curEl);
						this.$set(this.treeData, data.z_index, prevEl);
					}
				}else{  // 下
					// 向下，最后一个
					if(data.z_index === (data.totalLen - 1)){
						return
					}
					// 没有到底
					if(data.parent_id && data.parent_id.length === 24){
						let nextEl = this.treeData[data.parent_index].children[data.z_index + 1];
						let curEl = data;
						this.$set(this.treeData[data.parent_index].children, data.z_index + 1, curEl);
						this.$set(this.treeData[data.parent_index].children, data.z_index, nextEl);
					}else{
						let nextEl = this.treeData[data.z_index + 1];
						let curEl = data;
						this.$set(this.treeData, data.z_index + 1, curEl);
						this.$set(this.treeData, data.z_index, nextEl);
					}
				}
				arr = this.treeData;
				this.treeData = [];
				this.$nextTick(() => {
					this.treeData = arr;
					this.resetNavTypeItemIndex();
				})
			},
			// 提醒删除
			remindDialog(row){
				this.$confirm('此操作将永久删除该分类及其子分类, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.deleteData(row)
		        }).catch(() => { });
			},
			// 删除
			deleteData(row){
				let parent_id = (row.parent_id && row.parent_id.length === 24) ? row.parent_id : false;
				RemoveNav({_id: row._id, parent_id, nav_type: row.nav_type }, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						this.pullData(false, false);
					}
				})
			},
			showEditDialog(row){
				this.changeCurSelectTypeList();
				this.target = {
					_id: row._id,
					name: row.name,
        			parent_id: row.parent_id,
        			display: row.display,
        			nav_type: row.nav_type,
        			seo: {
        				title: row.seo.title,
        				keywords: row.seo.keywords,
        				description: row.seo.description,
        			}
				}

				this.isShowEditType = false;
				this.isEdit = true;
				this.editDialog = true;
			},
			saveData(){
				if(!this.isEdit){
					// 新增
					AddNav(this.target, {loading: true})
					.then(res => {
						this.ajaxMsgTips(res);
						if(res.data.code === 200){
							this.pullData(false, false);
							this.resetEditInfo();
							this.editDialog = false;
						}
					})
				}else{
					// 修改
					UpdateNav(this.target, {loading: true})
					.then(res => {
						this.ajaxMsgTips(res);
						if(res.data.code === 200){
							this.pullData(false, false);
							this.resetEditInfo();
							this.editDialog = false;
						}
					})
				}
			},
			resetEditInfo(done){
				if(done && typeof done === 'function'){
					done();
				}
				this.target = {
					name: '',
        			parent_id: false,
        			display: true,
        			nav_type: 'video',
        			seo: {
        				title: '',
        				keywords: '',
        				description: '',
        			}
				}
				this.isShowEditType = false;
				this.isEdit = false;

			},
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
				let tableObj = getObjH('nav-box');
				this.tabHight = (winH - (headerH + 44 + likeEditH + getObjStyleNum(tableObj, 'margin-top'))) + 'px';
			},
			resetNavTypeItemIndex(){
				// 给每个子级加上父级所在的index
				for(let [index, arg] of this.treeData.entries()){
					arg['z_index'] = index;
					arg['totalLen'] = this.treeData.length;
					if(arg.children && arg.children.length){
						for(let [index2, arg2] of arg.children.entries()){
							arg2['z_index'] = index2;
							arg2['parent_index'] = index;
							arg2['totalLen'] = arg.children.length;
						}
					}
				}
			},
			pullData(bool, b2){
				GetNavList({}, {loading: bool})
				.then(res => {
					if(b2){
						this.ajaxMsgTips(res);
					}
					if(res.data.code === 200){
						this.treeData = res.data.value;
						// 重设index，防止出错
						this.resetNavTypeItemIndex();
						//
						let arr = [];
						let obj = {};
						for(let arg of res.data.value){
							obj[arg._id] = arg.nav_type;
							arr.push({
								_id: arg._id,
								name: arg.name,
								nav_type: arg.nav_type,
							})
						}
						this.allNavJson = obj;
						this.allNavType = arr;
					}
				})
			}
		},
		created(){
			this.pullData(true, true)
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
	.nav-box{
		border: 1px solid #e6e6e6;
		background-color: #fff;
	}
	.lin28{
		height: 26px;
		line-height: 26px;
		font-size: 14px;
		display: block;
		width: 100%;
		position: relative;
	}
	.btns-pos{
		height: 26px;
		line-height: 26px;
		overflow: hidden;
		position: absolute;
		right: 10px;
		top: 0;
		.ico-btn{
			font-weight: bold;
			&:hover{
				color: red;
			}
		}
		.ico-fa{
			width: 15px;
			text-align: center;
		}
	}
	.row-item{
		margin-top: 20px;
		.label{
			width: 90px;
			padding-right: 10px;
			line-height: 32px;
			text-align: right;
		}
		.row-con{
			padding-left: 100px;
			min-height: 32px;
			line-height: 32px;
			>div{
				max-width: 900px;
			}
		}
	}
</style>