// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './framework/store'
import ElementUI from 'element-ui';
import { post } from '@/framework/http/request'
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale/lang/en'
import i18n from './project/i18n/i18n.js' //引入i8n配置
import App from './App'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './project/router'



Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(ElementUI, { locale });
Vue.prototype.$post = post;
// 下面这段代码是为了兼容ie浏览器而写
if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;

if (window.HTMLElement) {
  if (Object.getOwnPropertyNames(HTMLElement.prototype).indexOf('dataset') === -1) {
    Object.defineProperty(HTMLElement.prototype, 'dataset', {
      get: function () {
        var attributes = this.attributes; // 获取节点的所有属性
        var name = [];
        var value = []; // 定义两个数组保存属性名和属性值
        var obj = {}; // 定义一个空对象
        for (var i = 0; i < attributes.length; i++) { // 遍历节点的所有属性
          if (attributes[i].nodeName.slice(0, 5) === 'data-') { // 如果属性名的前面5个字符符合"data-"
            // 取出属性名的"data-"的后面的字符串放入name数组中
            name.push(attributes[i].nodeName.slice(5));
            // 取出对应的属性值放入value数组中
            value.push(attributes[i].nodeValue);
          }
        }
        for (var j = 0; j < name.length; j++) { // 遍历name和value数组
          obj[name[j]] = value[j]; // 将属性名和属性值保存到obj中
        }
        return obj; // 返回对象
      },
    });
  }
}


if (!('classList' in document.documentElement)) {
  Object.defineProperty(HTMLElement.prototype, 'classList', {
    get: function () {
      var self = this;
      function update(fn) {
        return function (value) {
          var classes = self.className.split(/\s+/g);
          var index = classes.indexOf(value);

          fn(classes, index, value);
          self.className = classes.join(' ');
        };
      }

      return {
        add: update(function (classes, index, value) {
          if (!~index) classes.push(value);
        }),

        remove: update(function (classes, index) {
          if (~index) classes.splice(index, 1);
        }),

        toggle: update(function (classes, index, value) {
          if (~index) { classes.splice(index, 1); } else { classes.push(value); }
        }),

        contains: function (value) {
          return !!~self.className.split(/\s+/g).indexOf(value);
        },

        item: function (i) {
          return self.className.split(/\s+/g)[i] || null;
        },
      };
    },
  });
}

(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
      || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
}());


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

//全局进度条的配置
	// NProgress.configure({ 
	//   showSpinner: true,  //加载微调器设置,默认为true
	//   //使用缓动（CSS缓动字符串）和速度（以毫秒为单位）调整动画设置。（默认：ease和200）
	//   easing: 'ease',
	//   speed: 2000,
	//   minimum: 0,  //更改启动时使用的最小百分比
	// })

	//对路由钩子函数进行设置
	//路由进入前
	router.beforeEach((to, from , next) => {
	  NProgress.start();
	  next();
	});
	//路由进入后
	router.afterEach(() => {  
	  NProgress.done()
	})