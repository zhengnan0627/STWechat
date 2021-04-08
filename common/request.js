
//网络请求 封装文件
// const api = "http://152.136.28.147:9007/VXMail/PublicUrl.ashx"

//请求封装
 function Request(options){
	const baseUrl = '1.85.30.230:8081';
	const api = 'http://1.85.30.230:8081' 
	const promise = new Promise(function(resolve,reject){
		uni.showLoading({
			title:'加载中',
			mask:true
		})
		uni.request({
			url:api,//+options.url
			method:options.method ||"GET",
			data:{proc:'pro_Get_dataInfo',...options.data},
			dataType:options.dataType || "json",
			header:options.header || {},
			success:function(res){
				uni.hideLoading()
				// console.log('接口返回'+ res);
				if(res.statusCode == 200){
					resolve(res.data)
				}else{
					resolve(res.data)
				}
			},
			fail:function(res){
				uni.hideLoading()
				// console.log('接口失败'+ res);
				reject('网络出错')
			}
		})
	})
	return promise;
}
export default Request
// module.exports = Request