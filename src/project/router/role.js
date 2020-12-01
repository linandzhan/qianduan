


const role = {
  routes: [
    {
      path:'/role/list',
      name:'roleList',
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
            name:'message.role',
            path:'/role/list'
          }
        ]
      },
      component: () => import('@/project/views/role/list')
    },
    {
      path:'/role/show/:id',
      name:'roleShow',
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
            name:'角色列表',
            path:'/role/list'
          },
          {
            name:'角色详情',
            path:'/role/show/:id'
          }
        ]
      },
      component: () => import('@/project/views/role/show')
    },

  ]
}
export default role;
