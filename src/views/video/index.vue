<template>
	<div class="pl20 pr20 pt20 pb20">
		<!-- 搜索块 -->
		<div class="like-edit pl20 pr20">
			<div class="clearfix">
				<div class="label pull-left">视频管理</div>
				<div class="query pa pub-flex pub-jc-center">
					<div class="pub-flex pub-jc-center pub-ai-center">
						<div class="picker-label">分类:</div>
						<div>
							<el-select size="small" style="width: 120px;" v-model="matchQuery['video_type']"  placeholder="分类">
								<el-option
									v-for="item in restaurants"
									:key="item.name"
									:label="item.name"
									:value="item._id">
								</el-option>
	    					</el-select>
						</div>
						<div class="picker-label">置顶:</div>
    					<div>
    						<el-select size="small" style="width: 95px;" v-model="matchQuery['popular']" placeholder="置顶">
								<el-option label="【全部】" value=""></el-option>
								<el-option label="开/置顶" :value="true"></el-option>
								<el-option label="关/置顶" :value="false"></el-option>
	    					</el-select>
    					</div>
    					<div class="picker-label">轮播:</div>
    					<div>
    						<el-select size="small" style="width: 95px;" v-model="matchQuery['openSwiper']" placeholder="轮播">
								<el-option label="【全部】" value=""></el-option>
								<el-option label="开/轮播" :value="true"></el-option>
								<el-option label="关/轮播" :value="false"></el-option>
	    					</el-select>
    					</div>
    					<div class="picker-label">留言:</div>
    					<div>
    						<el-select size="small" style="width: 95px;" v-model="matchQuery['allow_reply']" placeholder="留言">
								<el-option label="【全部】" value=""></el-option>
								<el-option label="开/留言" :value="true"></el-option>
								<el-option label="关/留言" :value="false"></el-option>
	    					</el-select>
    					</div>
    					<div class="picker-label">显示:</div>
    					<div>
    						<el-select size="small" style="width: 95px;" v-model="matchQuery['display']" placeholder="显示">
								<el-option label="【全部】" value=""></el-option>
								<el-option label="开/显示" :value="true"></el-option>
								<el-option label="关/显示" :value="false"></el-option>
	    					</el-select>
    					</div>
					</div>
					<el-input @keyup.enter.native="searchData" size="small" placeholder="请输入内容" v-model="searchVal" class="input-with-select">
						<el-button class="pointer" @click="searchData" slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div>
				<div class="pull-right edit">
					<el-button @click="pullData" size="small" class="" type="primary" icon="el-icon-refresh">刷新数据</el-button>
				</div>
			</div>
		</div>
		<div class="table mt20" time="1573723242882">
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
						<div @click="remindDialog(curSelectItem, '此操作将批量开启源排序多条数据，是否继续?', 'changeDataState', {scource_sort: true})" class="pointer edit-item-btn mr20">
							<i class="fa fa-sort-amount-desc pr5" aria-hidden="true"></i>
							<span>开/源排序</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量关闭源排序多条数据，是否继续?', 'changeDataState', {scource_sort: false})" class="pointer edit-item-btn mr20">
							<i class="fa fa-sort-amount-asc pr5" aria-hidden="true"></i>
							<span>关/源排序</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量开启推荐多条数据，是否继续?', 'changeDataState', {openSwiper: true})" class="pointer edit-item-btn mr20">
							<i class="fa fa-star pr5" aria-hidden="true"></i>
							<span>开/轮播图</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量关闭推荐多条数据，是否继续?', 'changeDataState', {openSwiper: false})" class="pointer edit-item-btn mr20">
							<i class="fa fa-star-o pr5" aria-hidden="true"></i>
							<span>关/轮播图</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量开启置顶多条数据，是否继续?', 'changeDataState', {popular: true})" class="pointer edit-item-btn mr20">
							<i class="fa fa-star pr5" aria-hidden="true"></i>
							<span>开/置顶</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量关闭置顶多条数据，是否继续?', 'changeDataState', {popular: false})" class="pointer edit-item-btn mr20">
							<i class="fa fa-star-o pr5" aria-hidden="true"></i>
							<span>关/置顶</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量显示多条数据，是否继续?', 'changeDataState', {display: true})" class="pointer edit-item-btn mr20">
							<i class="fa fa-toggle-on pr5" aria-hidden="true"></i>
							<span>显示</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量隐藏多条数据，是否继续?', 'changeDataState', {display: false})" class="pointer edit-item-btn mr20">
							<i class="fa fa-toggle-off pr5" aria-hidden="true"></i>
							<span>隐藏</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量允许留言多条数据，是否继续?', 'changeDataState', {allow_reply: true})" class="pointer edit-item-btn mr20">
							<i class="fa fa-send pr5" aria-hidden="true"></i>
							<span>开/留言</span>
						</div>
						<div @click="remindDialog(curSelectItem, '此操作将批量禁止留言多条数据，是否继续?', 'changeDataState', {allow_reply: false})" class="pointer edit-item-btn mr20">
							<i class="fa fa-send-o pr5" aria-hidden="true"></i>
							<span>关/留言</span>
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
					prop="videoTitle"
					label="视频名称"
					:sortable="true"
					width="240"
					:show-overflow-tooltip="true">
					<template slot-scope="scope">
						<el-button @click="$Bus.$emit('changeVideoDrawerState', {data: {'play_id': scope.row._id, 'video_info': scope.row}, 'is_pull': true, 'showState': true})" type="text">{{ scope.row.videoTitle }}</el-button>
					</template>
				</el-table-column>
				<el-table-column
					prop="remind_tip"
					label="更新状态"
					:sortable="false"
					:show-overflow-tooltip="true"
					width="160">
				</el-table-column>
				<el-table-column
					prop="video_rate"
					label="评分"
					:sortable="false"
					:show-overflow-tooltip="true"
					width="60">
					<template slot-scope="scope">
						<div class="text-center" :style="{color: scope.row.video_rate > 6 ? '#F56C6C' : '#606266', 'font-weight': 'bold'}">{{scope.row.video_rate}}</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="scource_sort"
					label="是否已开启源排序"
					:sortable="false"
					:show-overflow-tooltip="true"
					width="140">
					<template slot-scope="scope">
						<!-- <p class="text-center">{{ scope.row.display ? '是' : '否' }}</p> -->
						<div class="text-center">
							<el-switch
								v-model="scope.row.scource_sort"
								@change="changeVideoState(scope.row._id, $event, 'scource_sort', scope.row)"
								active-color="#13ce66"
								inactive-color="#dcdfe6">
							</el-switch>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="openSwiper"
					label="开启轮播"
					:sortable="false"
					width="80">
					<template slot-scope="scope">
						<div class="text-center">
							<el-switch
								v-model="scope.row.openSwiper"
								@change="changeVideoState(scope.row._id, $event, 'openSwiper', scope.row)"
								active-color="#13ce66"
								inactive-color="#dcdfe6">
							</el-switch>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="popular"
					label="置顶"
					:sortable="false"
					width="80">
					<template slot-scope="scope">
						<div class="text-center">
							<el-switch
								v-model="scope.row.popular"
								@change="changeVideoState(scope.row._id, $event, 'popular', scope.row)"
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
						<!-- <p class="text-center">{{ scope.row.display ? '是' : '否' }}</p> -->
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
					prop="allow_reply"
					label="是否允许留言"
					:sortable="false"
					width="110">
					<template slot-scope="scope">
						<!-- <p class="text-center">{{ scope.row.display ? '是' : '否' }}</p> -->
						<div class="text-center">
							<el-switch
								v-model="scope.row.allow_reply"
								@change="changeVideoState(scope.row._id, $event, 'allow_reply', scope.row)"
								active-color="#13ce66"
								inactive-color="#dcdfe6">
							</el-switch>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="update_time"
					label="更新时间"
					:sortable="true"
					width="160">
				</el-table-column>
				<el-table-column
					prop="video_type"
					label="视频类型"
					:sortable="true"
					width="160">
				</el-table-column>
				<el-table-column
					prop="language"
					label="语言"
					:sortable="true"
					width="160">
				</el-table-column>
				<el-table-column
					prop="sub_region"
					label="发布地区"
					:sortable="false"
					width="160">
				</el-table-column>
				<el-table-column
					prop="rel_time"
					label="上映时间"
					:sortable="true"
					width="105">
				</el-table-column>
				<el-table-column>
				</el-table-column>
				<el-table-column
			      	fixed="right"
			      	label="操作"
			      	width="334">
			      	<template slot-scope="scope">
						<div class="text-center">
							<el-tooltip class="item" effect="dark" content="静态化" placement="top">
				        		<el-button @click="$Bus.$emit('changeVideoStaticDialog', {'_id': scope.row._id, 'videoTitle': scope.row.videoTitle, 'showState': true})" size="mini" type="danger">
					        		<i class="fa fa-file" aria-hidden="true"></i>
				        		</el-button>
			        		</el-tooltip>
							<el-tooltip class="item" effect="dark" content="查看信息" placement="top">
				        		<el-button @click="$Bus.$emit('changeVideoDrawerState', {data: {'play_id': scope.row._id, 'video_info': scope.row}, 'is_pull': true, 'showState': true})" size="mini" type="success">
					        		<i class="fa fa-certificate" aria-hidden="true"></i>
				        		</el-button>
			        		</el-tooltip>
		        			<el-tooltip class="item" effect="dark" content="源管理" placement="top">
				        		<el-button @click="$Bus.$emit('changeVideoSource', {'_id': scope.row._id, 'videoTitle': scope.row.videoTitle, 'showState': true})" size="mini" type="warning">
					        		<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>
				        		</el-button>
			        		</el-tooltip>
			        		<el-tooltip class="item" effect="dark" content="修改评分" placement="top">
				        		<el-button @click="$Bus.$emit('changeVideoRateDialog', {'_id': scope.row._id, 'videoTitle': scope.row.videoTitle, 'video_rate': scope.row.video_rate, 'showState': true})" size="mini" type="info">
					        		<i class="fa fa-star" aria-hidden="true"></i>
				        		</el-button>
			        		</el-tooltip>
			        		<el-tooltip class="item" effect="dark" content="编辑视频" placement="top">
				        		<el-button @click="$router.push({path: '/main/write-video', query: {_id: scope.row._id}})" size="mini" type="primary">
					        		<i class="fa fa-pencil" aria-hidden="true"></i>
				        		</el-button>
			        		</el-tooltip>
			        		<el-tooltip class="item" effect="dark" content="删除视频" placement="top">
				        		<el-button @click="remindDialog([scope.row], '此操作将永久删除该数据, 是否继续?', 'deleteData')" size="mini" type="danger">
					        		<i class="fa fa-trash" aria-hidden="true"></i>
				        		</el-button>
    						</el-tooltip>
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
		<!-- 中间 静态化 -->
		<dialog-static />
		<!-- 中间 评分 -->
		<dialog-rate @update="pullData({loading: false, msgTip: false})" />
		<!-- 右侧 视频 详细信息 抽屉 -->
		<drawer-info />
		<!-- 中间 播放器 -->
		<dialog-player />
		<!-- 中间 源管理 -->
		<dialog-source />
	</div>
</template>
<script>
	// components
	import DrawerInfo from '@components/video/drawer-info.vue'
	import DialogPlayer from '@components/video/dialog-player.vue'
	import DialogRate from './dialog-rate.vue'
	import DialogStatic from './dialog-static.vue'
	import DialogSource from './dialog-source.vue'
	// api
	import { GetVideoList, GetCurVideoList, VideosRemove, ChangeState, AddScource, RemoveScource, UpdateScource, DirCoverImgs, DirPosterImgs } from '@api/video'
	import { GetNavList } from '@api/nav_type'
	export default {
		components: {
			DialogRate,
			DrawerInfo,
			DialogStatic,
			DialogPlayer,
			DialogSource,
		},
		data(){
			return {
				loading: true,
				//
				editBox: false,
				searchVal: '',      // 搜索框内容
				curSelectItem: [],  // 当前选中的行
				selectLen: 0,       // 当前选中的个数
				//
				tableData: [],
				tabHight: 0,        // 动态绑定  el-table高度计算
				pageTotal: 0,       // 总数据条数
				curPageNum: 1,      // 当前第几页
				curPageLen: 15,     // 默认每页多少条数据
				restaurants: [],    // 分类选择列表
				matchQuery: {
					'video_type': '',  // 当前选择的分类
					'popular': '',     // 当前是否置顶
					'openSwiper': '',  // 当前是否轮播
					'allow_reply': '', // 当前是否留言
					'display': '',     // 当前是否显示
				},
			}
		},
		methods: {
			// 提醒删除
			remindDialog(arr, remindText, fnName, conf){
				this.$confirm(remindText, '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this[fnName](arr, conf);
		        }).catch(() => { });
			},
			changeDataState(arr, conf){
				let params = arr.createObjIdArr();
				ChangeState({
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
			// 删除视频
			deleteData(arr){
				let params = arr.createObjIdArr();
				VideosRemove({
					list: params
				}, {loading: true})
				.then(res => {
					this.ajaxMsgTips(res);
					if(res.data.code === 200){
						this.pullData({loading: false, msgTip: false});
					}
				})
			},
			// 切换key对应的数据
			changeVideoState(_id, ev, key, row){
				let obj = {};
				obj[key] = ev;
				ChangeState({'info': obj, 'list': [_id]}, {loading: true})
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
				this.pullData({loading: false, msgTip: true});
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
			// 导航数据
			pullNavData(){
				// 导航数据
				GetNavList({}, {loading: false})
				.then(res => {
					if(res.data.code === 200){
						let arr = [{'name': '【不选择】', '_id': ''}];
						for(let arg of res.data.value){
							// 如果不是视频分类，略过
							if(arg.nav_type !== 'video'){
								continue;
							}
							// 通过视频分类
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
				// 附加参数
				let mq = this.matchQuery;
				let type = {};
				for(let attr in mq){
					let curVal = mq[attr];
					// 必须炎等
					if(curVal !== ''){
						type[attr] = curVal;
					}
				}
				query['type'] = type;
				GetVideoList(query, {loading})
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
			this.pullNavData();
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
			width: 900px;
			left: 50%;
			top: 50%;
			margin-left: -450px;
			margin-top: -16px;
			.picker-label{
				text-align: center;
				width: 40px;
				font-size: 13px
			}
		}
		.edit{
			margin-top: 16px;
		}
	}

</style>
<style lang="scss">
	.table[time="1573723242882"]{
		th{
			font-weight: normal;
			color: #666;
		}
	}
</style>