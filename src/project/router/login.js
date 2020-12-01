


const login = {
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/index',
      name: 'Welcome',
      meta:{
        breadcrumb:[
          {
            name:'message.index',
            path:'/index'
          }
        ],
        isShowLeftSider:true,
        isShowHeader:true,
      },
      component: () => import('@/project/views/Welcome.vue')
    },
    {
      path:'/login',
      name:'login',
      meta:{
        isShowHeader:true,
        isShowLeftSider:false,
      },
      component: () => import( '@/project/views/Login.vue'),
    },

  ]
}
export default login;
