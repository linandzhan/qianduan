


const manager = {
  routes: [
    {
      path:'/manager/list',
      name:'managerList',
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
            name:'message.manager',
            path:'/manager/list'
          }
        ]
      },
      component: () => import('@/project/views/manager/list')
    },
    {
      path:'/manager/show/:id',
      name:'managerShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        isShowBack:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'管理员列表',
            path:'/manager/list'
          },
          {
            name:'管理员详情',
            path:'/manager/show/:id'
          }
        ]
      },
      component: () => import('@/project/views/manager/show')
    },
  ]
}
export default manager;
