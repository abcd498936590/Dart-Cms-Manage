<template>
	<div class="play" time="1577703235931">
		<el-dialog
			:title="videoTitle"
			:visible.sync="showState"
			:close-on-click-modal="false"
			:before-close="closePlayer"
			width="800px">
			<div class="player-box" v-if="play.type === 'iframe'">
				<iframe webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" :src="play.url"></iframe>
			</div>
			<div class="player-box" v-if="play.type === 'player' && this.is_hls">
				<video-player
					ref="videoPlayer"
                  	class="vjs-custom-skin"
                  	:options="playerOptionsHls">
    			</video-player>
			</div>
			<div class="player-box" v-if="play.type === 'player' && !this.is_hls">
				<video-player
					ref="videoPlayer"
					class="vjs-custom-skin"
					:options="playerOptions">
				</video-player>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { videoPlayer } from 'vue-videojs7'
	export default {
		components: {
			videoPlayer,
		},
		data(){
			return {
				showState: false,
				videoTitle: "",
				play: {
					url: "",
					type: "iframe",     // 默认内嵌iframe远程播放器
				},
				playerOptionsHls: {
					autoplay: true,
					controls: true,
					controlBar: {
					  	timeDivider: false,
					  	durationDisplay: false,
					}
				},
				playerOptions: {
					sources: [],
				},
				is_hls: true,           // 是否 m3u8 hls
			}
		},
		computed: {
    		player(){
      			return this.$refs.videoPlayer.player
    		}
  		},
		methods: {
			playVideo(source){
		      	const video = {
		        	withCredentials: false,
		        	type: 'application/x-mpegurl',
		        	src: source
		      	}
		      	this.player.src(video)
		      	this.player.play()
		    },
		    closePlayer(done){
		    	if(this.play.type === 'player'){
		    		var video = document.getElementsByClassName('vjs-tech')[0];
		    		video.pause();
		    	}
		    	// exec
		    	done();
		    },
		    setPlayerType(str){
		    	let url = this.play.url.split('?')[0];
				let suffix = url.substring(url.lastIndexOf(".")+1);

				this.is_hls = (suffix === 'm3u8') ? true : false;
				return suffix
		    }
		},
		watch: {
			'showState'(n, o){
				if(n && this.play.type === 'player'){
					let suffix = this.setPlayerType()
					this.$nextTick(() => {
						if(this.is_hls){
							this.playVideo(this.play.url)
						}else{
							this.playerOptions.sources = [{
								type: `video/${suffix}`,
								src: this.play.url
							}]
						}
					})
				}
			}
		},
		created(){
			this.$Bus.$off('changeVideoPlayer');
			this.$Bus.$on('changeVideoPlayer', (conf) => {
				// 标题
				this.videoTitle = conf.videoTitle;
				// player info
				this.play.url = conf.url;
				// this.play.url = 'http://static.smartisanos.cn/common/video/t1-ui.mp4';  // 测试mp4源，来自锤子科技
				this.play.type = conf.type;
				// 状态
				this.showState = conf.showState;
			})
		}
	}
</script>
<style lang="scss" scoped>
	.player-box{
		height: 500px;
		iframe{
			border: none;
			width: 100%;
			height: 100%;
		}
	}
</style>
<style lang="scss">
	.video-js,
	.vjs-custom-skin{
		height: 100%!important;
		width: 100%!important;
	}
</style>