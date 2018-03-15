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
import dict from '@/components/dict/index'
import dictEdit from '@/components/dict/edit'
import datatable from '@/components/main/components/datatable'
import mainpage from '@/components/main/components/mainpage'
import overview from '@/components/main/components/overview'
import subject from '@/components/subject/index'
import subjectEdit from '@/components/subject/edit'
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
      path: '/table',
      name:'库表查询',
      component: table
    },
    {
      path: '/table/create',
      name:'新增库表',
      component: tableEdit
    },
    {
      path: '/table/update',
      name:'修改库表',
      component: tableEdit
    },
    {
      path: '/subject',
      name:'专题查询',
      component: subject
    },
    {
      path: '/subject/create',
      name:'新增专题',
      component: subjectEdit
    },
    {
      path: '/subject/update',
      name:'修改专题',
      component: subjectEdit
    },
    {
      path: '/dict',
      name:'数据字典查询',
      component: dict
    },
    {
      path: '/dict/create',
      name:'新增数据字典',
      component: dictEdit
    },
    {
      path: '/dict/update',
      name:'修改数据字典',
      component: dictEdit
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
