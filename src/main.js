import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import axios from 'axios';
Vue.prototype.axios = axios;

// // 时间过滤器
// import moment from 'moment'

// Vue.filter('moment', function (value, formatString) {
//   formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
//   // return moment(value).format(formatString); // value可以是普通日期 20170723
//   return moment.unix(value).format(formatString); // 这是时间戳转时间
// });


Vue.filter("dateFormat", function(dataStr) {
	var dt = new Date(dataStr);
	// yyyy-mm-dd
	var y = dt.getFullYear();
	var m = dt.getMonth() + 1;
	var d = dt.getDate();
	var hh = dt.getHours();
	var mm = dt.getMinutes();
	var ss = dt.getSeconds();

	return y + "-" + m + "-" + d + "  " + hh + ":" + mm + ":" + ss
})

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
