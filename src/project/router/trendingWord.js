


const trendingWord = {
  routes: [
    {
      path:'/trendingWord/list',
      name:'trendingWordList',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        keepAlive:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'热搜管理',
            path:'/trendingWord/list'
          }
        ]
      },
      component: () => import('@/project/views/trendingWord/list')
    },
  ]
}
export default trendingWord;
