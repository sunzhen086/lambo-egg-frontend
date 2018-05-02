import Vue from 'vue'
import Router from 'vue-router'

//登录
import login from '@/components/login/login';

//前端展示
import mainnav from '@/components/main-nav';
import homepage from '@/components/homepage/homepage';
import overview from '@/components/overview/overview';
import datatable from '@/components/datatable/datatable';
import datadetail from '@/components/datadetail/datadetail';
import filedetail from '@/components/datadetail/filedetail';
import categorynav from '@/components/category-nav';
import categoryoverview from '@/components/category/overview/overview';
import dataview from '@/components/dataview/dataview';
import feedback from '@/components/feedback/feedback';

Vue.use(Router);
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
      path:"/mainnav",
      name: "顶部导航",
      component: mainnav,
      children:[
        {
          path: '/home',
          name:'首页',
          component: homepage
        },
        {
          path: '/overview',
          name:'烟草指数',
          component: overview
        },
        {
          path:"/datatable",
          name:'数据目录',
          component:datatable
        },
        {
          path:"/datadetail",
          name:'数据明细',
          component:datadetail
        },
        {
          path:"/filedetail",
          name:'文件明细',
          component:filedetail
        },
        {
          path: '/categorynav',
          name:'数据分类',
          component: categorynav,
          children:[
            {
              path: '/category/overview',
              name:'分类总览',
              component: categoryoverview
            },
            {
              path:"/category/dataview",
              name:'分类数据',
              component:dataview
            },
            {
              path:"/category/feedback",
              name:'分类反馈',
              component:feedback
            }
          ]
        }
      ]
    }
  ]
})

export default router;
