const permission = {
  routes: [
    {
      path:'/permission/list',
      name:'permissionList',
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
            name:'权限管理',
            path:'/permission/list'
          }
        ]
      },
      component: () => import('@/project/views/permission/list')
    },

  ]
}
export default permission;
