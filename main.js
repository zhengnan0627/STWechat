import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
//引入自建请求封装
import $request from './common/request.js'
Vue.prototype.$request = $request

//引入检测登录方法
import $logo from './common/tologo.js'
Vue.prototype.$logo = $logo
//定义全局变量商品类型
Vue.prototype.$type = 'taocan'

App.mpType = 'app'
// 引入全局uView
import uView from "uview-ui";
Vue.use(uView);
const app = new Vue({
    ...App
})
app.$mount()
