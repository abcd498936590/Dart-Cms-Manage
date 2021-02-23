import request from '@utils/request'

// 生成静态文件
export function createStatic(data, options){
	return request({
			url: '/manage/article/createStaticFile',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 获取全部文章
export function GetAllArticle(data, options){
	return request({
			url: '/manage/article/getAllArticle',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 获取单个文章信息
export function GetCurArticle(data, options){
	return request({
			url: '/manage/article/getCurArticle',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 删除文章
export function RemoveArticle(data, options){
	return request({
			url: '/manage/article/removeArticle',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 添加文章
export function AddArticle(data, options){
	return request({
			url: '/manage/article/addArticle',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 修改文章
export function UpdateArticle(data, options){
	return request({
			url: '/manage/article/updateArticle',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}
// 修改状态信息
export function ChangeArtState(data, options){
	return request({
			url: '/manage/article/changeArtState',
		    method: 'POST',
		    data: data || {}
		},
		options || {}
	);
}