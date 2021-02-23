<template>
	<div class="pb20 pt20 pl20 pr20">
		<div class="box pr">
			<div ref="tip-box" class="tip-box">
				<div class="tip-btn btn-warning" @click="showDrawerInfo">
					<div>点</div>
					<div>击</div>
					<div>预</div>
					<div>览</div>
				</div>
				<div class="tip-btn btn-primary mt10" @click="remindDialog({type: 'reset', text: '此操作将清空当前数据, 是否继续?'})">
					<div>新</div>
					<div>增</div>
					<div>视</div>
					<div>频</div>
				</div>
			</div>
			<div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">视频标题：</label>
					<div class="row-con">
						<div>
							<el-input size="small" v-model="info.videoTitle" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">封面图片：</label>
					<div class="row-con">
						<div class="pub-flex">
							<div class="pub-flex1">
								<el-input size="small" v-model="info.videoImage" placeholder="请输入内容"></el-input>
							</div>
							<div class="pub-flex" style="width: 130px;justify-content: flex-end;">
								<el-button @click="$Bus.$emit('changePickerCover', {showState: true})" size="small" type="success">从资源库中选取</el-button>
							</div>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">开启轮播图：</label>
					<div class="row-con">
						<div class="pub-flex">
							<el-switch
								v-model="info.openSwiper"
								active-color="#13ce66"
								inactive-color="#dcdfe6">
							</el-switch>
							<p class="pl20" style="color: #F56C6C;">开启后，需要上传轮播图，请注意！</p>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">选择轮播图：</label>
					<div class="row-con">
						<div class="pub-flex">
							<div class="pub-flex1">
								<el-input size="small" v-model="info.poster" placeholder="请输入内容"></el-input>
							</div>
							<div class="pub-flex" style="width: 130px;justify-content: flex-end;">
								<el-button @click="$Bus.$emit('changePickerPoster', {showState: true})" size="small" type="success">从资源库中选取</el-button>
							</div>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">导演：</label>
					<div class="row-con">
						<div>
							<el-input size="small" v-model="info.director" placeholder="英文逗号隔开,"></el-input>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">主演：</label>
					<div class="row-con">
						<div>
							<el-input size="small" v-model="info.performer" placeholder="英文逗号隔开,"></el-input>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">类型：</label>
					<div class="row-con">
						<div>
							<el-select v-model="info.video_type" size="small" filterable placeholder="请选择">
								<el-option
									v-for="item in restaurants"
									:key="item._id"
									:label="item.name"
									:value="item._id">
								</el-option>
							</el-select>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">评分：</label>
					<div class="row-con">
						<div class="pub-flex" style="height: 32px;justify-content: flex-start;">
							<el-rate v-model="info.video_rate" :max="10" :allow-half="false" :show-text="false"></el-rate>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">语言：</label>
					<div class="row-con">
						<div>
							<el-input size="small" v-model="info.language" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">发行地区：</label>
					<div class="row-con">
						<div>
							<el-input size="small" v-model="info.sub_region" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">发行时间：</label>
					<div class="row-con">
						<div>
							<el-input size="small" v-model="info.rel_time" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">更新时间：</label>
					<div class="row-con">
						<div>
							<!-- <el-input size="small" v-model="info.update_time" placeholder="请输入内容"></el-input> -->
							<el-date-picker
								size="small"
								value-format="yyyy-MM-dd HH:mm"
						      	v-model="info.update_time"
						      	type="datetime"
						      	placeholder="选择日期时间">
						    </el-date-picker>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">影片介绍：</label>
					<div class="row-con">
						<div>
							<!-- <el-input size="small" v-model="info.introduce" placeholder="请输入内容"></el-input> -->
							<el-input
								size="small"
								type="textarea"
								:autosize="{ minRows: 2, maxRows: 4}"
								placeholder="请输入内容"
								v-model="info.introduce">
							</el-input>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">更新状态：</label>
					<div class="row-con">
						<div>
							<el-input size="small" v-model="info.remind_tip" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">关联新闻：</label>
					<div class="row-con">
						<div class="pub-flex">
							<div class="pub-flex1">
								<el-input size="small" v-model="info.news_id" placeholder="多条新闻中间用英文逗号(,)隔开"></el-input>
							</div>
							<div class="pub-flex" style="width: 130px;justify-content: flex-end;">
								<el-popover
								    placement="bottom-end"
								    title="选择新闻"
								    width="600"
								    @show="$Bus.$emit('showArticlePopover')"
								    trigger="click">
							    	<popover-article />
									<el-button slot="reference" size="small" type="success">从资源库中选取</el-button>
								</el-popover>
							</div>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">是否置顶：</label>
					<div class="row-con">
						<div class="pub-flex">
							<el-switch
								v-model="info.popular"
								active-color="#13ce66"
								inactive-color="#dcdfe6">
							</el-switch>
							<p class="pl20" style="color: #F56C6C;">置顶视频后视频排序会靠前，请注意！</p>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">允许留言：</label>
					<div class="row-con">
						<div>
							<el-switch
								v-model="info.allow_reply"
								active-color="#13ce66"
								inactive-color="#dcdfe6">
							</el-switch>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">是否显示：</label>
					<div class="row-con">
						<div class="pub-flex">
							<el-switch
								v-model="info.display"
								active-color="#13ce66"
								inactive-color="#dcdfe6">
							</el-switch>
							<p class="pl20" style="color: #F56C6C;">默认新建视频显示状态，请注意！</p>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">播放源是否排序：</label>
					<div class="row-con">
						<div class="pub-flex">
							<el-switch
								v-model="info.scource_sort"
								active-color="#13ce66"
								inactive-color="#dcdfe6">
							</el-switch>
							<p class="pl20" style="color: #F56C6C;">默认走系统排序，请注意！</p>
						</div>
					</div>
				</div>
				<!-- 源管理 -->
				<div class="row-item clearfix">
					<label class="pull-left" for="">播放源：</label>
					<div class="row-con">
						<div>
							<div class="pub-flex">
								<div style="width: 140px;">
									<el-select size="small" class="pr20" v-model="curSourceType" placeholder="请选择">
										<el-option
											v-for="item in [{k: '内置播放器', v: 'player'}, {k: '外链播放器', v: 'iframe'}]"
											:key="item.v"
											:label="item.k"
											:value="item.v">
										</el-option>
									</el-select>
								</div>
								<div class="pr20 pub-flex" style="width: 200px;">
									<span class="row-label">源名称：</span>
									<div class="pub-flex1">
										<el-input @keyup.enter="addOneSource" size="small" v-model="curSourceName" placeholder="请输入内容"></el-input>
									</div>
								</div>
								<el-button @click="addOneSource" size="small" type="primary">新增一组源</el-button>
								<div v-show="source.length" class="pub-flex pub-flex1" style="justify-content: flex-end;">
									<span class="row-label" style="width: 90px;">移动当前源：</span>
									<el-button-group>
									  	<el-button @click="moveCurSourcePos('left')" size="small" type="primary">
									  		<i class="fa fa-arrow-left" style="margin-right: 5px;" aria-hidden="true"></i>
									  		<span>向左移动</span>
									  	</el-button>
									  	<el-button @click="moveCurSourcePos('right')" size="small" type="primary">
									  		<span>向右移动</span>
									  		<i class="fa fa-arrow-right" style="margin-left: 5px;" aria-hidden="true"></i>
									  	</el-button>
									</el-button-group>
								</div>
							</div>
							<div class="tabs mt20">
								<div class="bar pub-flex">
									<div @click="curTabIndex = index" :class="curTabIndex === index ? 'active' : ''" v-for="(item, index) in source">
										{{ item.name }}
										<i @click.stop="removeCurSource(index, $event)" class="el-icon-close ml10"></i>
									</div>
								</div>
								<div class="pr20 pl20" style="border:1px solid #ddd;border-radius: 4px;">
									<div class="address pub-flex pt20">
										<div class="pr20 pub-flex" style="width: 200px;">
											<span class="row-label">名称：</span>
											<el-input size="small" v-model="target.name" placeholder="请输入内容"></el-input>
										</div>
										<div class="pub-flex1 pub-flex pr20">
											<span class="row-label">地址：</span>
											<el-input size="small" v-model="target.value" placeholder="请输入内容"></el-input>
										</div>
										<div>
											<el-button @click="curListAddItem" size="small" type="success">确定</el-button>
										</div>
										<div class="pl20">
											<el-button @click="showSourceEditDialog" type="warning" size="small">批量添加</el-button>
										</div>
									</div>
									<div class="mt20" style="height: 400px;overflow-y: auto;">
										<div v-show="curTabIndex === index1" v-for="(item, index1) in source" :key="item.z_name">
											<div v-if="item.list.length">
												<div v-for="(item2, index2) in item.list" class="pub-flex source-item">
													<i @click="removeCurItem(index1, index2)" class="el-icon-close ml20 pointer"></i>
													<div class="pl20">
														<span>名称：</span>
														<span style="color: #67C23A">{{item2.split('$')[0]}}</span>
													</div>
													<div class="pl20">
														<span>地址：</span>
														<span style="color: #F56C6C">{{item2.split('$')[1]}}</span>
													</div>
												</div>
											</div>
											<div v-else class="text-center pt20 pb20">
												<p>暂无源</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row-item clearfix">
					<label class="pull-left" for="">提交选择：</label>
					<div class="row-con">
						<div class="pub-flex">
							<el-button v-if="!isEdit" @click="remindDialog({type: 'add', text: '此操作将添加一条数据, 是否继续?'})" size="small" type="success">确认添加</el-button>
							<el-button v-else @click="remindDialog({type: 'edit', text: '此操作将更新一条数据, 是否继续?'})" size="small" type="primary">确认更新</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 侧面封面 -->
		<drawer-cover @select="setDataValue" />
		<!-- 侧面海报 -->
		<drawer-poster @select="setDataValue" />
		<!-- 右侧 视频 详细信息 抽屉 -->
		<drawer-info />
		<!-- 中间 播放器 -->
		<dialog-player />
		<!-- 中间 批量添加源 -->
		<dialog-source @select="deliveryResult" />
	</div>
</template>
<script>
	// components
	import DrawerCover from './drawer-cover.vue'
	import DrawerPoster from './drawer-poster.vue'
	import DialogSource from './dialog-source.vue'
	import PopoverArticle from './popover-article.vue'
	import DrawerInfo from '@components/video/drawer-info.vue'
	import DialogPlayer from '@components/video/dialog-player.vue'
	// api
	import { GetNavList } from '@api/nav_type'
	import { GetVideoList, AddVideo, DirPosterImgs, DirCoverImgs, GetCurVideoInfo, UpdateCurVideo } from '@api/video'
	export default {
		components: {
			DrawerCover,
			DrawerPoster,
			DrawerInfo,
			PopoverArticle,
			DialogPlayer,
			DialogSource,
		},
		data(){
			return {
				//
				isEdit: false,
				_id: "",
				infos: {
					videoTitle: "",
					director: "",
					performer: "",
					video_type: "",
					video_rate: 0,
					language: "",
					sub_region: "",
					rel_time: "",
					introduce: "",
					remind_tip: "",
					news_id: "",
					videoImage: "",
					video_tags: "",
					update_time: "",
					poster: "",
					popular: false,
					allow_reply: false,
					openSwiper: false,
					display: true,
					scource_sort: false,
				},
				info: {},
				source: [],
				target: {
					name: "",
					value: ""
				},
				curSourceName: "",                // 新增源 - 名称name
				curSourceType: "player",          // 新增源 - 类型type
				curTabIndex: 0,
				restaurants: [],                  // 类型候选
			}
		},
		methods: {
			showSourceEditDialog(){
				if(!this.source.length){
					this.$message({
						type: 'warning',
						message: '没有播放源可供添加，请先添加一组播放源！',
						duration: 1000,
					})
					return
				}
				this.$Bus.$emit('changeEditSource', true)
			},
			deliveryResult(arr){
				this.source[this.curTabIndex].list = this.source[this.curTabIndex].list.concat(arr);
			},
			// 显示侧边预览
			showDrawerInfo(){
				let data = this.createInfoData({getType: true});
				if(!data){
					return
				}
				this.$Bus.$emit('changeVideoDrawerState', {showState: true, is_pull: false, data});
			},
			remindDialog(obj){
				this.$confirm(obj.text, '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	if(obj.type === 'add'){
		          		// 添加
		          		this.insertVideoInfo()
		          	}else if(obj.type === 'edit'){
		          		// 更新
		          		this.updateVideoInfo();
		          	}else if(obj.type === 'reset'){
		          		// 重置
		          		this.$router.push({path: '/main/write-video', query: {time: new Date().getTime()}})
		          	}
		        }).catch(() => { });
			},
			searchTypeVal(){
				let curId = this.info.video_type;
				for(let arg of this.restaurants){
					if(arg._id === curId){
						return arg.name.replace('┣━━━━━', '');
					}
				}
			},
			createInfoData({getType=false}){
				if(!this.info.videoTitle.trim()){
					this.$message({
						type: 'warning',
						message: '视频标题必填！',
						duration: 1000,
					})
					return
				}
				if(!this.info.videoImage.trim()){
					this.$message({
						type: 'warning',
						message: '封面图片必填！',
						duration: 1000,
					})
					return
				}
				if(!this.info.video_type.trim() || this.info.video_type.length !== 24){
					this.$message({
						type: 'warning',
						message: '视频分类必填！',
						duration: 1000,
					})
					return
				}
				let infoData = {
				    "videoTitle" : this.info.videoTitle.trim(),
				    "director" : this.info.director.trim(),
				    "videoImage" : this.info.videoImage.trim(),
				    "poster" : this.info.poster.trim(),
				    "video_tags" : this.info.video_tags.trim() ? this.info.video_tags.trim().split(',') : [],
				    "performer" : this.info.performer.trim(),
				    "video_type" : getType ? this.searchTypeVal() : this.info.video_type.trim(),
				    "video_rate" : this.info.video_rate,
				    "update_time" : this.info.update_time,
				    "language" : this.info.language.trim(),
				    "sub_region" : this.info.sub_region.trim(),
				    "rel_time" : this.info.rel_time.trim(),
				    "introduce" : this.info.introduce.trim(),
				    "remind_tip" : this.info.remind_tip.trim(),
				    "news_id": this.info.news_id.trim() ? this.info.news_id.trim().split(',') : [],
				    "popular" : this.info.popular,
				    "allow_reply" : this.info.allow_reply,
				    "openSwiper": this.info.openSwiper,
				    "display" : this.info.display,
				    "scource_sort" : this.info.scource_sort,
				}
				let sList = this.source;
				let newSourceArr = [];
				for(let arg of sList){
					let curTarget = Object.assign({}, arg);
					curTarget.list = curTarget.list.join('#');
					newSourceArr.push(curTarget);
				}
				return {
					'info': infoData,
					'source': newSourceArr
				}
			},
			updateVideoInfo(){
				let data = this.createInfoData({getType: false});
				if(!data){
					return
				}
				data['_id'] = this._id;
				UpdateCurVideo(data)
				.then(res => {
					this.ajaxMsgTips(res);
					setTimeout(() => {
						this.$router.push({path: '/main/video'})
					}, 500)
				})
			},
			insertVideoInfo(){
				let data = this.createInfoData({getType: false});
				if(!data){
					return
				}
				AddVideo(data)
				.then(res => {
					this.ajaxMsgTips(res);
					setTimeout(() => {
						this.$router.push({path: '/main/video'})
					}, 500)
				})
			},
			// 侧边栏选中图片
			setDataValue(pathVal, parentKey){
				this.info[parentKey] = pathVal;
			},
			// 重设index
			resetSourceItemIndex(){
				for(let [i, arg] of this.source.entries()){
					arg['index'] = i;
				}
			},
			// 移动当前源的位置
			moveCurSourcePos(pos){
				if(pos === 'left'){
					if(this.curTabIndex === 0){
						return
					}
					let prevEl = this.source[this.curTabIndex - 1];
					let curEl = this.source[this.curTabIndex];
					//
					this.$set(this.source, this.curTabIndex - 1, curEl);
					this.$set(this.source, this.curTabIndex, prevEl);
					this.curTabIndex--;
					this.resetSourceItemIndex();
					return
				}
				if(pos === 'right'){
					if(this.curTabIndex === (this.source.length-1)){
						return
					}
					let nextEl = this.source[this.curTabIndex + 1];
					let curEl = this.source[this.curTabIndex];
					//
					this.$set(this.source, this.curTabIndex + 1, curEl);
					this.$set(this.source, this.curTabIndex, nextEl);
					this.curTabIndex++;
					this.resetSourceItemIndex();
				}
			},
			// 删除当前项源
			removeCurSource(index){
				this.source.splice(index, 1);
			},
			// 当前index对应的list新增一条
			curListAddItem(){
				if(!this.source.length){
					this.$message({
						type: 'warning',
						message: '请先添加一组源',
						duration: 1000,
					})
					return
				}
				if(!this.target.name){
					this.$message({
						type: 'warning',
						message: '请输入名称',
						duration: 1000,
					})
					return
				}
				if(!this.target.value){
					this.$message({
						type: 'warning',
						message: '请输入链接',
						duration: 1000,
					})
					return
				}
				this.source[this.curTabIndex].list.push(`${this.target.name}$${this.target.value}`);
				this.target = {name: "", value: ""};
			},
			// 添加一组源
			addOneSource(){
				if(!this.curSourceName){
					this.$message({
						type: 'warning',
						message: '请输入源名称',
						duration: 1000,
					})
					return
				}
				this.source.push({
				    "index" : this.source.length,
				    "name" : this.curSourceName,
				    "z_name" : new Date().getTime() + '',
				    "type" : this.curSourceType,
				    "list" : [],
				})
				this.curSourceName = "";
			},
			// 删除单条源
			removeCurItem(i1, i2){
				this.source[i1].list.splice(i2, 1);
			},
			// 拉所有的类型
			pullAllTypes(){
				GetNavList({}, {loading: true})
				.then(res => {
					if(res.data.code === 200){
						let arr = [];
						for(let arg of res.data.value){
							arr.push({'name': arg.name, '_id': arg._id})
							if(arg.children && arg.children.length){
								for(let arg2 of arg.children){
									arr.push({'name': '┣━━━━━' + arg2.name, '_id': arg2._id})
								}
							}
						}
						this.restaurants = arr;
					}
				})
			},
			// 拉取视频的信息
			pullCurVideoInfo(_id){
				GetCurVideoInfo({
					_id
				})
				.then(res => {
					if(res.data.code === 200 && res.data.value.length){
						let result = res.data.value[0];
						let video_tags = result.video_tags.join(',');
						for(let arg of result.source){
							arg.list = arg.list.split('#');
						}
						result.news_id = result.news_id.join(',');
						this.source = result.source;
						this.info = Object.assign({}, result, {video_tags});
					}
				})
				.catch((err) => {
					this.isEdit = false;
					this.info = Object.assign({}, this.infos);
				})
			},
			setTipBtnStyle(ev){
				let el = this.$refs['tip-box'];
				let num = 0;
				if(ev){
					num = ev.target.scrollTop;
				}
				if(el && el.style){
					el.style.top = ((document.body.clientHeight / 2) + num - 45) + 'px';
				}
			},
			// 设置预览按钮的top值
			initEvent(){
				let scrollBox = document.getElementsByClassName('cpt-con')[0];
				this.setTipBtnStyle();
				scrollBox.onscroll = this.setTipBtnStyle
			},
			initSetting(){
				let _id = this.$route.query._id;
				this.isEdit = (_id && _id.length === 24) ? true : false;
				this._id = this.isEdit ? _id : "";
				if(this.isEdit){
					this.pullCurVideoInfo(_id);
				}else{
					this.info = Object.assign({}, this.infos);
					this.source = [];
				}
				this.pullAllTypes();
			}
		},
		created(){
			this.initSetting()
		},
		watch:{
			'$route'(n, o){
				this.initSetting()
			}
		},
		mounted(){
			this.$nextTick(this.initEvent);
		},
		beforeDestroy(){
			let scrollBox = document.getElementsByClassName('cpt-con')[0];
			scrollBox.onresize = null;
		}
	}
</script>
<style lang="scss" scoped>
	.box{
		background: #fff;
		padding: 20px;
		border: 1px solid #ddd;
		.tip-box{
			line-height: 20px;
			width: 40px;
			text-align: center;
			position: absolute;
			right: 0;
			top: 50%;
			margin-top: -100px;
			font-size: 14px;
			color: #fff;
			cursor: pointer;
			transition: all .4s;
			.tip-btn{
				padding: 5px 0;
				transition: all .4s;
				&:hover{
					background: #F56C6C;
				}
			}
			.btn-warning{
				background: #E6A23C;
			}
			.btn-primary{
				background: #409EFF;
			}
		}
		.row-item{
			margin-top: 20px;
			label{
				width: 140px;
				padding-right: 10px;
				line-height: 32px;
				text-align: right;
			}
			.row-con{
				padding-left: 150px;
				min-height: 32px;
				line-height: 32px;
				>div{
					max-width: 900px;
				}
			}
		}
		.row-label{
			width: 58px;
			font-size: 14px;
			line-height: 32px;
			display: block;
		}
		.tabs{
			.bar{
				margin-bottom: -1px;
				>div{
					border: 1px solid #ddd;
					line-height: 40px;
					border-top-right-radius: 4px;
					border-top-left-radius: 4px;
					padding: 0 10px;
					font-size: 14px;
					cursor: pointer;
					transition: all .5s;
					margin-right: 2px;
					&:hover{
						background: #ddd;
					}
				}
				.active{
					background: #ddd;
					border-color: #ddd;
				}
			}
			.source-item{
				font-size: 14px;
				background: #f5f3f3;
				transition: all .5s;
				margin-bottom: 1px;
				&:hover{
					background: #ddd;
				}
			}
		}
	}
	.sub-tips{
		line-height: 24px;
		font-size: 14px;
		color: #F56C6C;
	}
</style>