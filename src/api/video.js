import request from '@utils/request'

// 生成静态化页面
export function CreateStatic(data, options){
	return request({
			url: '/manage/video/createVideoStatic',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 获取全部视频
export function GetVideoList(data, options){
	return request({
			url: '/manage/video/getVideoList',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 获取视频的播放列表
export function GetCurVideoList(data, options){
	return request({
			url: '/manage/video/getCurVideoList',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 遍历所有的封面
export function DirCoverImgs(data, options){
	return request({
			url: '/manage/video/dirCoverImgs',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 遍历所有的海报
export function DirPosterImgs(data, options){
	return request({
			url: '/manage/video/dirPosterImgs',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 删除视频
export function VideosRemove(data, options){
	return request({
			url: '/manage/video/removeVideo',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 修改视频信息
export function ChangeState(data, options){
	return request({
			url: '/manage/video/changeState',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 新增视频
export function AddVideo(data, options){
	return request({
			url: '/manage/video/addVideo',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 给视频添加源
export function AddScource(data, options){
	return request({
			url: '/manage/video/addScource',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 给视频删除源
export function RemoveScource(data, options){
	return request({
			url: '/manage/video/removeScource',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 给视频新增的源更新
export function UpdateScource(data, options){
	return request({
			url: '/manage/video/updateScource',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 上传 封面 海报
export function UploadImages(){
	return '/manage/video/uploadImages'
}
// 删除 图片 海报 ……
export function RemoveImages(data, options){
	return request({
			url: '/manage/video/removeImages',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 获取单个视频的全部信息
export function GetCurVideoInfo(data, options){
	return request({
			url: '/manage/video/getCurVideoInfo',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 更新单个视频
export function UpdateCurVideo(data, options){
	return request({
			url: '/manage/video/updateCurVideo',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 源排序
export function ScourceSort(data, options){
	return request({
			url: '/manage/video/scourceSort',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}