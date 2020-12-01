const module = {
  routes: [
    {
      path: '/module/list',
      name: 'module',
      meta:{
        breadcrumb:[
          {
            name:'模块管理',
            path:'/module/list'
          }
        ],
        isShowLeftSider:true,
        isShowHeader:true,
      },
      component: () => import('@/project/views/module/list.vue')
    },
  ]
}
export default module;
