


const user = {
  routes: [
    {
      path:'/user/list',
      name:'userList',
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
            name:'message.user',
            path:'/user/list'
          }
        ]
      },
      component: () => import('@/project/views/user/list')
    },
    {
      path:'/user/show/:id',
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
export default user;
