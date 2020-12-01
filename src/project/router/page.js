const page = {
  routes: [
    {
      path: '/page/system/list',
      name: 'pageList',
      meta: {
        isShowHeader: true,
        isShowLeftSider: true,
        keepAlive: true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name: '系统文章管理',
            path: '/page/system/list'
          },
        ]
      },
      component: () => import('@/project/views/page/system/list')
    },
    {
      path: '/page/system/show/:id',
      name: 'pageShow',
      meta: {
        isShowHeader: true,
        isShowLeftSider: true,
        keepAlive: false,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name: '系统文章管理',
            path: '/page/system/list'
          },
          {
            name: '系统文章详情',
          },
        ]
      },
      component: () => import('@/project/views/page/system/show')
    },
    {
      path: '/page/help/list',
      name: 'pageList',
      meta: {
        isShowHeader: true,
        isShowLeftSider: true,
        keepAlive: true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name: '帮助中心文章管理',
            path: '/page/help/list'
          },
        ]
      },
      component: () => import('@/project/views/page/help/list')
    },
    {
      path: '/page/help/show/:id',
      name: 'pageShow',
      meta: {
        isShowHeader: true,
        isShowLeftSider: true,
        keepAlive: false,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name: '帮助中心文章管理',
            path: '/page/help/list'
          },
          {
            name: '帮助中心文章详情',
          },
        ]
      },
      component: () => import('@/project/views/page/help/show')
    },
  ]
}
export default page;
