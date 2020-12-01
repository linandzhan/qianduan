import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import login from './login'
import user from  '../views/user/user-router.js'
import role from '../views/role/role-router'
import manager from '../views/manager/manager-router'
import advice from '../views/advice/advice-router'

import version from '../views/version/version-router'
import trendingWord from './trendingWord'
import slide from '../views/slide/slide-router'
import page from '../views/page/page-router'
import notification from '../views/notification/notification-router'
import module from './module'
import permission from "./permission";

Vue.use(Router);
Vue.use(ElementUI);

let routeList = [
  login.routes,
  manager.routes,
  user.routes,
  role.routes,
  advice.routes,
  version.routes,
  trendingWord.routes,
  slide.routes,
  page.routes,
  notification.routes,
  permission.routes,
  module.routes,

];

let routes = [];

//拼接路由
routeList.map(s => {
  routes = routes.concat(s);
});

const router = new Router({
  routes: routes
});

router.beforeEach((to,from,next) => {
//   const loading = ElementUI.Loading.service({
//     lock: true,
//     text: '加载中',

//     background: 'rgba(0, 0, 0, 0)'
//   });
  /**
   * @Description: 拦截未登录
   * @author zd Lin
   * @date 2020/3/24
  */
  let user = localStorage.getItem('userCache');
  if (user) {
    next();
  } else {
    if (to.path === '/login' ||  to.path === '/'){
      next();
    } else {
      next({path:'/login'});
      loading.close()
    }

  }

});

// router.afterEach(route => {
//   const loading = ElementUI.Loading.service({
//     lock: true,
//     text: '加载中',
//     background: 'rgba(0, 0, 0, 0)'
//   });
//   //将滚动条恢复到最顶端
//   window.scrollTo(0, 0);
//   setTimeout(() => {
//      loading.close();
//   },200);

// });

export default router;
