// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

// mock data
import Mock from './mock/index'

// icon font
import './public/imooc/style.css'

// toast component
import toast from './public/javascripts/toast';
Vue.prototype.$toast = toast

// store
import storage from './public/javascripts/storage';
Vue.prototype.$storage = storage

// axios.defaults.baseURL = 'http://127.0.0.1:8000' // 设置默认请求的url
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://mockjs.com/api' // 设置默认请求的url
Vue.prototype.$http = axios

//ElementUI的配置
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

// change title
router.beforeEach((to, from, next) => {
  let title = to.meta.title;
  title && (document.title = to.meta.title);
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})


