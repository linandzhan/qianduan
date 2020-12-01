


const version = {
  routes: [
    {
      path:'/version/list',
      name:'versionList',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        keepAlive:true,
        breadcrumb: [
          {
            name:'message.index',
            path:'/index'
          },
          {
            name:'版本管理',
            path:'/version/list'
          }
        ]
      },
      component: () => import('@/project/views/version/list')
    },
    {
      path:'/version/show/:id',
      name:'userShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'用户列表',
            path:'/user/list'
          },
          {
            name:'用户详情',
            path:'/user/show/:id'
          }
        ]
      },
      component: () => import('@/project/views/user/show')
    }

  ]
}
export default version;
