import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import frame from '@/components/frame/frame'
import pagingTable from '@/components/table/paging-table'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {name:'登录页'}
    },
    {
      path: '/login',
      name: '登录页',
      component: login,
      meta:{
        anonymous:true
      }
    },
    {
      path: "/frame",
      name: "菜单框架",
      component: frame,
      children: [
        {
          path: 'table/paging-table',
          meta:{
            title: '分页表格示例',
          },
          name:'分页表格',
          component: pagingTable
        }
      ]
    }
  ]
})

export default router;
