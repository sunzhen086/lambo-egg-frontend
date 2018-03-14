import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import Config from '@/config/config'
import util from '@/libs/util';
import login from '@/components/login/login'
import main from '@/components/main/main'
import frame from '@/components/frame/frame'
import dataSubject from '@/components/dataSubject/dataSubject'
import dataSearch from '@/components/dataSearch/dataSearch'
import table from '@/components/table/index'
import tableEdit from '@/components/table/editTable'
import datatable from '@/components/main/components/datatable'
import mainpage from '@/components/main/components/mainpage'
import overview from '@/components/main/components/overview'

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
      path: '/main',
      name: '首页',
      component: main
    },
    {
      path: '/dataSubject',
      name: '数据专题',
      component: dataSubject
    },
    {
      path: '/dataSearch',
      name: '数据查询',
      component: dataSearch
    },
    {
      path: 'table',
      meta:{
        title: '库表查询',
      },
      name:'库表查询',
      component: table
    },
    {
      path: 'table/create',
      meta:{
        title: '新增库表',
      },
      name:'新增库表',
      component: tableEdit
    },
    {
      path: "/main",
      name: "菜单框架",
      component: main,
      children: [
        {
          path: 'datatable',
          name:'数据目录',
          component: datatable
        },
        {
          path: 'mainpage',
          name:'首页',
          component: mainpage
        },
        {
          path: 'overview',
          name:'行业概览',
          component: overview
        }
      ]
    }
  ]
})

export default router;
