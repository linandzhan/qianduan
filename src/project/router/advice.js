


const advice = {
  routes: [
    {
      path:'/advice/list',
      name:'adviceList',
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
            name:'message.advice',
            path:'/advice/list'
          }
        ]
      },
      component: () => import('@/project/views/advice/list')
    },
    {
      path:'/advice/show/:id',
      name:'adviceShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'意见反馈',
            path:'/advice/list'
          },
          {
            name:'意见反馈详情',
            path:'/advice/show/:id'
          }
        ]
      },
      component: () => import('@/project/views/advice/show')
    },

  ]
}
export default advice;
