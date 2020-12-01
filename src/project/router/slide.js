
const advert = {
  routes: [
    {
      path:'/slide/list',
      name:'slideList',
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
            name:'广告管理',
            path:'/slide/list'
          }
        ]
      },
      component: () => import('@/project/views/slide/list')
    },
    {
      path:'/slide/show/:id',
      name:'slideShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'广告管理',
            path:'/slide/list'
          },
          {
            name:'广告管理详情',
            path:'/slide/show/:id'
          }
        ]
      },
      component: () => import('@/project/views/slide/show')
    },

  ]
}
export default advert;
