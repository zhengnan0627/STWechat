
//网络请求 封装文件
// const api = "http://152.136.28.147:9007/VXMail/PublicUrl.ashx"

//请求封装

 function Request(options){
	// const baseUrl = '1.85.30.230:8081';
	let timer = null // 定时器 800ms数据未返回开始loading,成功返回后取消掉
	const api = 'https://xcx.sxstyy.com:8081/index.php' 
	const promise = new Promise(function(resolve,reject){
		if(!timer) {
			timer = setTimeout(() => {
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				// console.log('定时器开始');
				// console.log(timer);
				}, 1000);
		}
		// uni.showLoading({
		// 	title:'加载中',
		// 	mask:true
		// })
		uni.request({
			url:api,//+options.url
			method:options.method ||"GET",
			data:{proc:'pro_Get_dataInfo',...options.data},
			dataType:options.dataType || "json",
			header:options.header || {},
			success:function(res){
				// console.log(timer);
				if(timer){
					clearTimeout(timer);
					// console.log('定时器结束'+ timer);
					uni.hideLoading()
				}
				
				// console.log('接口返回'+ res);
				if(res.statusCode == 200){
					resolve(res.data)
				}else{
					resolve(res.data)
				}
			},
			fail:function(res){
				
				if(timer){
					clearTimeout(timer);
					// console.log('定时器结束');
				}
				
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